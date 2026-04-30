import Navbar from '@/components/Navbar';
// Si rescataste tu globals.css y lo moviste, impórtalo aquí. 
// Si no, puedes omitir esta línea por ahora.
import './globals.css'; 

export const metadata = {
  title: 'Biblioteca Inteligente',
  description: 'Proyecto de examen consumiendo la API de Open Library',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* El Navbar aparecerá en la parte superior de todas las rutas obligatorias */}
        <Navbar />
        
        {/* Aquí es donde Next.js inyecta el contenido de cada página específica */}
        <main style={{ padding: '2rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}