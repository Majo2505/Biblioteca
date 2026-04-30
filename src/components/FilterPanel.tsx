"use client";
import { useState } from 'react';

// Interfaz para enviar los datos de los filtros a la página padre
export interface FilterOptions {
  minYear?: number;
  maxYear?: number;
  language?: string;
  sortBy?: string;
}

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [minYear, setMinYear] = useState<string>('');
  const [maxYear, setMaxYear] = useState<string>('');
  const [language, setLanguage] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange({
      minYear: minYear ? parseInt(minYear) : undefined,
      maxYear: maxYear ? parseInt(maxYear) : undefined,
      language: language || undefined,
      sortBy: sortBy || undefined,
    });
  };

  const handleReset = () => {
    setMinYear('');
    setMaxYear('');
    setLanguage('');
    setSortBy('');
    onFilterChange({}); // Envía un objeto vacío para limpiar los filtros
  };

  return (
    <form onSubmit={handleApply} className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">Año Mínimo:</label>
        <input 
          type="number" 
          value={minYear} 
          onChange={(e) => setMinYear(e.target.value)} 
          className="filter-input" 
          placeholder="Ej. 1990" 
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Año Máximo:</label>
        <input 
          type="number" 
          value={maxYear} 
          onChange={(e) => setMaxYear(e.target.value)} 
          className="filter-input" 
          placeholder="Ej. 2024" 
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">Idioma:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="filter-select">
          <option value="">Todos</option>
          <option value="spa">Español</option>
          <option value="eng">Inglés</option>
          <option value="fre">Francés</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Ordenar por:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="">Relevancia</option>
          <option value="year_asc">Año (Antiguos primero)</option>
          <option value="year_desc">Año (Recientes primero)</option>
          <option value="editions">Cantidad de ediciones</option>
        </select>
      </div>

      <div className="filter-actions">
        <button type="submit" className="btn-primary">Aplicar Filtros</button>
        <button type="button" onClick={handleReset} className="btn-secondary">Limpiar</button>
      </div>
    </form>
  );
}