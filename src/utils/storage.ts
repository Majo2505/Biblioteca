// src/utils/storage.ts
import { Book } from '../types';

const FAVORITES_KEY = 'biblioteca_favoritos';

// Obtener todos los favoritos
export const getFavorites = (): Book[] => {
  if (typeof window === 'undefined') return []; // Evita errores en el servidor de Next.js
  
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

// Agregar a favoritos (Evitando duplicados)[cite: 1]
export const addFavorite = (book: Book): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const isDuplicate = favorites.some((fav) => fav.key === book.key);
  
  if (!isDuplicate) {
    favorites.push(book);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

// Eliminar favoritos[cite: 1]
export const removeFavorite = (key: string): void => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavorites();
  const newFavorites = favorites.filter((fav) => fav.key !== key);
  
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
};

// Utilidad para que el Integrante 3 filtre los libros fácilmente
export const filterBooks = (
  books: Book[], 
  minYear?: number, 
  maxYear?: number, 
  language?: string
): Book[] => {
  return books.filter((book) => {
    const year = book.first_publish_year;
    
    // Filtrar por año mínimo
    if (minYear && (!year || year < minYear)) return false;
    
    // Filtrar por año máximo
    if (maxYear && (!year || year > maxYear)) return false;
    
    // Filtrar por idioma
    if (language && book.language) {
      if (!book.language.includes(language)) return false;
    }
    
    return true;
  });
};