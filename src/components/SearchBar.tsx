"use client";
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string, type: 'q' | 'title' | 'author') => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'q' | 'title' | 'author'>('q');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, type);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <select 
        value={type} 
        onChange={(e) => setType(e.target.value as 'q' | 'title' | 'author')}
        className="search-select"
      >
        <option value="q">Palabra clave / Tema</option>
        <option value="title">Título</option>
        <option value="author">Autor</option>
      </select>
      
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Ej: Clean Code, Tolkien..." 
        className="search-input"
      />
      
      <button type="submit" className="btn-primary">
        Buscar
      </button>
    </form>
  );
}