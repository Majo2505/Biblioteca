export default function AboutPage() {
  return (
    <div style={{ maxWidth: '600px', lineHeight: '1.6' }}>
      <h1>ℹ️ Acerca de este proyecto</h1>
      <div style={{ backgroundColor: '#f5f5f5', padding: '1.5rem', borderRadius: '8px', color: '#333' }}>
        <p><strong>Proyecto:</strong> Biblioteca Inteligente en React</p>
        <p><strong>Estudiantes:</strong> Maria Jose Sandoval Orellana, Flora Angelina Ortiz Rojas </p>
        <p><strong>Universidad:</strong> Universidad Católica Boliviana "San Pablo"</p>
        <p><strong>Docente:</strong> Ing. Mauricio Alejandro Quezada Bustillo</p>
      </div>
      <p style={{ marginTop: '1rem' }}>
        Esta aplicación consume la API pública de Open Library para buscar libros, ver detalles, filtrar resultados y guardar favoritos utilizando Next.js y TypeScript.
      </p>
    </div>
  );
}