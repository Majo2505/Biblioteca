// src/services/openLibraryService.ts
import { Book, BookDetail } from '../types';

const BASE_URL = 'https://openlibrary.org';

// Función 1: Buscar libros (por título, autor o general)
export const searchBooks = async (query: string, type: 'q' | 'title' | 'author' = 'q', limit: number = 20): Promise<Book[]> => {
  try {
    // Permite buscar general (?q=), por título (?title=) o autor (?author=)
    const response = await fetch(`${BASE_URL}/search.json?${type}=${encodeURIComponent(query)}&limit=${limit}`);
    if (!response.ok) throw new Error('Error en la búsqueda');
    
    const data = await response.json();
    return data.docs as Book[];
  } catch (error) {
    console.error("Error en searchBooks:", error);
    return [];
  }
};

// Función 2: Obtener detalle del libro
export const getBookDetail = async (id: string): Promise<BookDetail | null> => {
  try {
    // El ID que envía Open Library usualmente viene con "/works/" incluido. 
    // Si solo viene el ID (ej. OL82563W), lo ajustamos
    const cleanId = id.replace('/works/', ''); 
    const response = await fetch(`${BASE_URL}/works/${cleanId}.json`);
    
    if (!response.ok) throw new Error('Error al obtener el detalle');
    const data = await response.json();
    return data as BookDetail;
  } catch (error) {
    console.error("Error en getBookDetail:", error);
    return null;
  }
};

// Función 3: Buscar libros por tema/categoría
export const getBooksBySubject = async (topic: string, limit: number = 12): Promise<Book[]> => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${topic.toLocaleLowerCase()}.json?limit=${limit}`);
    if (!response.ok) throw new Error('Error al buscar por tema');
    
    const data = await response.json();


    return data.works.map((work:any) =>({
      key: work.key,
      title: work.title,
      author_name: work.authors?.map((a: any) => a.name) || ['Autor desconocido'],
      first_publish_year: work.first_publish_year,
      cover_i: work.cover_id,
      edition_count: work.edition_count
    })) as Book[];
  } catch (error) {
    console.error("Error en getBooksBySubject:", error);
    return [];
  }
};

// Utilidad extra para la portada (que ya teníamos)
export const getCoverUrl = (coverId?: number) => {
  if (!coverId) return '/placeholder-cover.jpg'; // Imagen genérica si no hay portada
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`; //[cite: 1]
};