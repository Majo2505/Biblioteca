"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Book } from '../types';
import { getCoverUrl } from '../services/openLibraryService';
import { addFavorite, removeFavorite, isBookFavorite } from '../utils/storage';

interface BookCardProps {
  book: Book;
  onFavoriteToggle?: () => void;
}

export default function BookCard({ book, onFavoriteToggle }: BookCardProps) {
  const workId = book.key.replace('/works/', '');
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(isBookFavorite(book.key));
  }, [book.key]);

  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(book.key);
    } else {
      addFavorite(book);
    }
    setIsFav(!isFav);
    if (onFavoriteToggle) onFavoriteToggle(); 
  };
  return (
    <div className="book-card">
      <img 
        src={getCoverUrl(book.cover_i)} 
        alt={`Portada de ${book.title}`} 
        className="book-card-image"
      />
      <div className="book-card-content">
        <h3 className="book-card-title">{book.title}</h3>
        <p><strong>Autor:</strong> {book.author_name ? book.author_name.join(', ') : 'Desconocido'}</p>
        <p><strong>Año:</strong> {book.first_publish_year || 'N/D'}</p>
        <p><strong>Ediciones:</strong> {book.edition_count || 0}</p>
        
        <div className="book-card-actions">
          <Link href={`/libro/${workId}`} className="btn-primary">
            Ver detalle
          </Link>
          <button 
            className={`btn-warning ${isFav ? 'active' : ''}`} 
            onClick={handleFavoriteClick}
          >
            {isFav ? "❤️ Quitar" : "⭐ Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}