"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
   const [dark, setDark] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/" className="navbar-link">
          📚 Biblioteca Inteligente
        </Link>
      </div>
      <ul className="navbar-list">
        <li><Link href="/" className="navbar-link">Inicio</Link></li>
        <li><Link href="/buscar" className="navbar-link">Buscar</Link></li>
        <li><Link href="/favoritos" className="navbar-link">Favoritos</Link></li>
        <li><Link href="/acerca" className="navbar-link">Acerca</Link></li>
      </ul>

      <button className="btn-primary" onClick={() => setDark(!dark)}>
        {dark ? "☀️" : "🌙"}
      </button>
    </nav>
  );
}