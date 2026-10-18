import React from 'react';

const Libros = () => {
  return (
    <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h1>Catalogo de Libros</h1>
      <p style={{ marginTop: '1rem' }}>
        Libros Disponibles.
      </p>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '2rem', 
        border: '2px dashed var(--border)', 
        borderRadius: '8px' 
      }}>
        <p>***</p>
      </div>
    </main>
  );
};

export default Libros;