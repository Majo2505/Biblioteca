import { Book } from '../types';

const FAVORITES_KEY = 'biblioteca_favoritos';

// --- Lógica de Favoritos ---

// Obtener todos los favoritos desde localStorage[cite: 1]
export const getFavorites = (): Book[] => {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};

//Verifica si un libro ya esta en favoritos
export const isBookFavorite = (key: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.key === key);
};

// Agregar a favoritos evitando duplicados[cite: 1]
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

// --- Lógica de Filtrado y Ordenamiento (Para el Buscador) ---

// Interfaz local para recibir las opciones del panel
interface FilterOptions {
  minYear?: number;
  maxYear?: number;
  language?: string;
  sortBy?: string;
}

// Filtra y ordena un arreglo de libros
export const filterAndSortBooks = (books: Book[], filters: FilterOptions): Book[] => {
  let result = [...books];

  // Filtro: Año mínimo[cite: 1]
  if (filters.minYear) {
    result = result.filter(book => book.first_publish_year && book.first_publish_year >= filters.minYear!);
  }

  // Filtro: Año máximo[cite: 1]
  if (filters.maxYear) {
    result = result.filter(book => book.first_publish_year && book.first_publish_year <= filters.maxYear!);
  }

  // Filtro: Idioma[cite: 1]
  if (filters.language) {
    result = result.filter(book => book.language && book.language.includes(filters.language!));
  }

  // Ordenamiento[cite: 1]
  if (filters.sortBy) {
    if (filters.sortBy === 'year_asc') {
      result.sort((a, b) => (a.first_publish_year || 0) - (b.first_publish_year || 0));
    } else if (filters.sortBy === 'year_desc') {
      result.sort((a, b) => (b.first_publish_year || 0) - (a.first_publish_year || 0));
    } else if (filters.sortBy === 'editions') {
      result.sort((a, b) => (b.edition_count || 0) - (a.edition_count || 0));
    }
  }

  return result;
};