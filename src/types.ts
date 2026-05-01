// src/types.ts

// Estructura base del libro para las tarjetas de búsqueda
export interface Book {
  key: string;               // ID único (ej. /works/OL82563W)
  title: string;
  author_name?: string[];    // Viene como arreglo en la API
  first_publish_year?: number;
  edition_count?: number;
  cover_i?: number;          // ID de la portada para armar la URL
  language?: string[];       // Útil para los filtros del Integrante 3
}

export interface Author {
  key: string;
  name: string;
}

// Estructura detallada cuando entras a la página del libro
export interface BookDetail {
  key: string;
  title: string;
  description?: string | { value: string }; // Open Library a veces manda un string, a veces un objeto
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  authors?: { author: { key: string }; name?: string }[] | Author[];
}

// Estructura para el autor (por si el Integrante 3 lo necesita)
export interface Author {
  key: string;
  name: string;
}