"use client";
import Link from 'next/link';
import { Book } from '../types';
import { getCoverUrl } from '../services/openLibraryService';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const workId = book.key.replace('/works/', '');

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
          <button className="btn-warning">
            ⭐ Favoritos
          </button>
        </div>
      </div>
    </div>
  );
}