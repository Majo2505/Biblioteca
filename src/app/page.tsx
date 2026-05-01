"use client";
import { useEffect, useState } from 'react';
import { getBooksBySubject, searchBooks } from '../services/openLibraryService';
import { Book } from '../types';
import BookCard from '../components/BookCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialBooks = async () => {
      try {
        setLoading(true);
        const results = await getBooksBySubject('programming');
        setBooks(results.slice(0, 12)); 
      } catch (err) {
        setError('Hubo un error al cargar los libros populares.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialBooks();
  }, []);

  return (
    <div>
      <h1 className="page-title">📚 Libros Populares: Programación</h1>
      
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}