"use client";
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import BookCard from '../../components/BookCard';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { searchBooks } from '../../services/openLibraryService';
import { Book } from '../../types';

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string, type: 'q' | 'title' | 'author') => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await searchBooks(query, type);
      setBooks(results);
    } catch (err) {
      setError('Ocurrió un error al intentar buscar los libros. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">🔍 Buscador Avanzado</h1>
      
      <SearchBar onSearch={handleSearch} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && hasSearched && books.length === 0 && (
        <p className="empty-message">No se encontraron libros para tu búsqueda.</p>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}