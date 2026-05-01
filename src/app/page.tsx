"use client";
import { useEffect, useState } from 'react';
import { getBooksBySubject} from '../services/openLibraryService';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        setLoading(true);
        const results = await getBooksBySubject('programming', 12, page);
        setBooks(results); 
      } catch (err) {
        setError('Hubo un error al cargar los libros populares.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, [page]);

  return (
    <div>
      <h1 className="page-title">📚 Libros Populares: Programación</h1>
      
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && (
       <>
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
        <div className="flex justify-center items-center gap-4 mt-12 mb-8">
            <button 
              className="btn-primary disabled:opacity-50"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
            >
              ⬅ Anterior
            </button>
            
            <span className="font-bold text-lg">Página {page}</span>
            
            <button 
              className="btn-primary disabled:opacity-50"
              onClick={() => setPage(p => p + 1)}
              disabled={books.length < 12 || loading} 
            >
              Siguiente ➡
            </button>
          </div>
          </>
      )}
    </div>
  );
}