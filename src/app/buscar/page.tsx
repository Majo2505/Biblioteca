"use client";
import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import FilterPanel, { FilterOptions } from '../../components/FilterPanel';
import BookCard from '../../components/BookCard';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { searchBooks } from '../../services/openLibraryService';
import { filterAndSortBooks } from '../../utils/storage';
import { Book } from '../../types';

export default function SearchPage() {
  const [allBooks, setAllBooks] = useState<Book[]>([]); 
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});

  const handleSearch = async (query: string, type: 'q' | 'title' | 'author') => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const results = await searchBooks(query, type);
      setAllBooks(results);
      // Aplicamos los filtros actuales inmediatamente a los nuevos resultados
      setDisplayedBooks(filterAndSortBooks(results, currentFilters));
    } catch (err) {
      setError('Ocurrió un error al intentar buscar los libros. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    // Aplicamos los nuevos filtros sobre la lista original de libros sin volver a llamar a la API
    setDisplayedBooks(filterAndSortBooks(allBooks, filters));
  };

  return (
    <div>
      <h1 className="page-title">🔍 Buscador Avanzado</h1>
      
      <SearchBar onSearch={handleSearch} />
      <FilterPanel onFilterChange={handleFilterChange} />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      
      {!loading && !error && hasSearched && displayedBooks.length === 0 && (
        <p className="empty-message">No se encontraron libros para tu búsqueda o filtros.</p>
      )}

      {!loading && !error && displayedBooks.length > 0 && (
        <div className="book-grid">
          {displayedBooks.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}