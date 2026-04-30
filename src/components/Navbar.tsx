import Link from 'next/link';

export default function Navbar() {
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
    </nav>
  );
}