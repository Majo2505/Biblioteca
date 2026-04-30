export default function AboutPage() {
  return (
    <div className="about-container">
      <h1 className="page-title">ℹ️ Acerca de este proyecto</h1>
      
      <div className="about-card">
        <h2 className="about-title">Datos Académicos</h2>
        <ul className="about-list">
          <li><strong>Proyecto:</strong> Biblioteca Inteligente en React</li>
          <li><strong>Equipo de Desarrollo:</strong>
            <br />• Maria Jose Sandoval Orellana
            <br />• Flora Angelina Ortiz Rojas
            <br />• Alejandro Machaca
          </li>
          <li><strong>Universidad:</strong> Universidad Católica Boliviana "San Pablo"</li>
          <li><strong>Docente:</strong> Ing. Mauricio Alejandro Quezada Bustillo</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Descripción Técnica</h2>
        <p>
          Esta aplicación es una Single Page Application (SPA) desarrollada con <strong>Next.js (App Router)</strong> y <strong>TypeScript</strong>. 
          Consume de manera asíncrona la API pública de <em>Open Library</em> para realizar búsquedas generales, por título y por autor.
        </p>
        <p>
          Se implementó una separación limpia de responsabilidades (Servicios, Utilidades, Componentes y Páginas) y se hace uso del <code>localStorage</code> del navegador para la persistencia de datos de los libros favoritos.
        </p>
      </div>
    </div>
  );
}