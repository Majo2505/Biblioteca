"use client";
import { useEffect, useState, use } from 'react';
import { getBookDetail, getCoverUrl } from '../../../services/openLibraryService';
import { BookDetail,Book } from '../../../types';
import { addFavorite, removeFavorite, getFavorites } from '../../../utils/storage';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import Link from 'next/link';

export default function BookDetailPage({ params }: { params: Promise<{ workId: string }> }) {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const resolvedParams = use(params);
  const workId = resolvedParams.workId;
  const fullKey = `/works/${workId}`;

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getBookDetail(workId);
        if (data) {
          setBook(data);
          const favs = getFavorites();
          setIsFavorite(favs.some((f) => f.key === fullKey));
        } else {
          setError('No se pudo encontrar el detalle de este libro.');
        }
      } catch (err) {
        setError('Ocurrió un error al cargar la información.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [workId,fullKey]);

  const handleToggleFavorite = () => {
    if (!book) return;

    if (isFavorite) {
      removeFavorite(fullKey);
      setIsFavorite(false);
    } else {
      const bookToSave: Book = {
        key: fullKey,
        title: book.title,
        author_name: book.authors?.map((a: any) => a.name || "Desconocido") || [],
        first_publish_year: book.first_publish_date ? parseInt(book.first_publish_date) : undefined,
        cover_i: book.covers?.[0],
      };
      addFavorite(bookToSave); 
      setIsFavorite(true);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return <ErrorMessage message="Libro no encontrado" />;

  const description = typeof book.description === 'string' 
    ? book.description 
    : book.description?.value || 'No hay descripción disponible.';

  return (
    <div>
      <div className="detail-header">
        <Link href="/" className="btn-primary">
          ⬅ Volver
        </Link>
      </div>

      <div className="detail-card">
        <img 
          src={getCoverUrl(book.covers?.[0])} 
          alt={`Portada de ${book.title}`} 
          className="detail-image"
        />
        
        <div className="detail-content">
          <h1 className="detail-title">{book.title}</h1>
          <p><strong>Fecha de publicación:</strong> {book.first_publish_date || 'N/D'}</p>

          {book.authors && (
            <p>
              <strong>Autores:</strong>{" "}
              {book.authors.map((a: any) => a.name || a.author?.key || "Desconocido").join(', ')}
            </p>
          )}
          
          <div className="detail-section">
            <strong>Descripción:</strong>
            <p className="detail-description">{description}</p>
          </div>

          {book.subjects && (
            <div className="detail-section">
              <strong>Temas:</strong>
              <p>{book.subjects.slice(0, 5).join(', ')}</p>
            </div>
          )}

          <div className="detail-actions">
            <a 
              href={`https://openlibrary.org/works/${workId}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Ver en Open Library
            </a>
            <button 
              className={`btn-warning ${isFavorite ? 'active' : ''}`} 
              onClick={handleToggleFavorite}
            >
              {isFavorite ? "❤️ Quitar de Favoritos" : "⭐ Agregar a Favoritos"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}