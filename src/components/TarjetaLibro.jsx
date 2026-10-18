import React from 'react';
import { useNavigate } from 'react-router-dom';

const TarjetaLibro = ({ libro }) => {
  const navigate = useNavigate();

  const irADetalles = () => {
    navigate(`/libro/${libro.id}`);
  };

  const manejarPedir = (e) => {
    e.stopPropagation();
    
    alert(`Has solicitado pedir el libro: ${libro.titulo}`); 
  };

  return (
    <div 
      onClick={irADetalles} 
      style={{ 
        border: '1px solid var(--border)', 
        borderRadius: '8px', 
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg)',
        height: '100%',
        cursor: 'pointer', 
        transition: 'transform 0.2s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      
      <div style={{ height: '260px', display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <img 
          src={libro.imagen} 
          alt={`Portada de ${libro.titulo}`} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} 
        />
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem', flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{libro.titulo}</h3>
        <p style={{ color: 'gray', fontSize: '0.85rem', margin: 0, textTransform: 'uppercase' }}>{libro.autor}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button 
          onClick={manejarPedir}
          style={{ 
            padding: '0.6rem', 
            backgroundColor: 'transparent', 
            border: '1px solid var(--accent)', 
            color: 'var(--text-h)', 
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-h)';
          }}
        >
          Pedir
        </button>
      </div>
    </div>
  );
};

export default TarjetaLibro;