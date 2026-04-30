import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link href="/" style={styles.link}>
          📚 Biblioteca Inteligente
        </Link>
      </div>
      <ul style={styles.ul}>
        <li><Link href="/" style={styles.link}>Inicio</Link></li>
        <li><Link href="/buscar" style={styles.link}>Buscar</Link></li>
        <li><Link href="/favoritos" style={styles.link}>Favoritos</Link></li>
        <li><Link href="/acerca" style={styles.link}>Acerca</Link></li>
      </ul>
    </nav>
  );
}

// Unos estilos básicos en línea para que se vea decente antes de usar SCSS
const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  ul: {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    margin: 0,
    padding: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
  }
};