export default function BookDetailPage({ params }: { params: { workId: string } }) {
  return (
    <div>
      <h1>📖 Detalle de la Obra</h1>
      <p>El ID de este libro es: <strong>{params.workId}</strong></p>
      <p>Aquí mostraremos la portada grande, la descripción, el autor, el año de publicación y los temas relacionados.</p>
      {/* Próximamente: Llamada al endpoint de detalle usando params.workId */}
    </div>
  );
}