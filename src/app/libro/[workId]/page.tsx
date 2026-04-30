"use client";
import { useEffect, useState } from 'react';
import { getBookDetail, getCoverUrl } from '../../../services/openLibraryService';
import { BookDetail } from '../../../types';
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import Link from 'next/link';

export default function BookDetailPage({ params }: { params: { workId: string } }) {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getBookDetail(params.workId);
        if (data) {
          setBook(data);
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
  }, [params.workId]);

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
              href={`https://openlibrary.org/works/${params.workId}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Ver en Open Library
            </a>
            <button className="btn-warning">⭐ Agregar a Favoritos</button>
          </div>
        </div>
      </div>
    </div>
  );
}