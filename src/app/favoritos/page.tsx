"use client";
import { useEffect, useState } from 'react';
import { getFavorites } from '../../utils/storage';
import { Book } from '../../types';
import BookCard from '../../components/BookCard';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Book[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <div>
      <h1 className="page-title">⭐ Mis Favoritos</h1>
      
      {favorites.length === 0 ? (
        <p className="empty-message">Aún no has agregado ningún libro a tus favoritos.</p>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}