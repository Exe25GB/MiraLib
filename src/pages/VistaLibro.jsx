// src/pages/VistaLibro.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { librosBd } from '../data/libros';
import BotonDirecciones from '../components/BotonDirecciones';

const VistaLibro = () => {
  // useParams extrae el "/:id" de la URL
  const { id } = useParams();
  
  // Buscamos el libro en nuestra base de datos falsa
  const libro = librosBd.find(l => l.id === parseInt(id));

  // Si el usuario inventa un ID en la URL que no existe
  if (!libro) {
    return (
      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>Libro no encontrado</h2>
        <Link to="/libros" style={{ color: 'var(--accent)' }}>Volver al catálogo</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      <Link to="/libros" style={{ color: 'var(--accent)', marginBottom: '2rem', display: 'inline-block' }}>
        ← Volver al catálogo
      </Link>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <img 
          src={libro.imagen} 
          alt={libro.titulo} 
          style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', objectFit: 'cover' }} 
        />
        
        <div style={{ flex: '1', minWidth: '300px', textAlign: 'left' }}>
          <h1 style={{ margin: '0 0 0.5rem 0' }}>{libro.titulo}</h1>
          <h3 style={{ color: 'gray', margin: '0 0 1rem 0', fontWeight: 'normal' }}>{libro.autor}</h3>
          
          <p style={{ 
            display: 'inline-block', 
            backgroundColor: 'var(--accent-bg)', 
            color: 'var(--text-h)', 
            padding: '0.3rem 0.8rem', 
            borderRadius: '12px', 
            fontSize: '0.9rem',
            marginBottom: '2rem'
          }}>
            {libro.categoria}
          </p>

          <h2>Sinopsis</h2>
          <p style={{ lineHeight: '1.6', marginTop: '1rem' }}>{libro.sinopsis}</p>
          
          <div style={{ marginTop: '3rem' }}>
            <BotonDirecciones texto="Pedir este libro ahora" onClick={() => alert('¡Pedido en proceso!')} ancho="fit-content" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default VistaLibro;