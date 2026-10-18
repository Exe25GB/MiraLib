import React from 'react';

const FiltroLibro = ({ categoriasUnicas, categoriasSeleccionadas, setCategoriasSeleccionadas }) => {
  
  const manejarCambio = (categoria) => {
    if (categoriasSeleccionadas.includes(categoria)) {
      setCategoriasSeleccionadas(categoriasSeleccionadas.filter(cat => cat !== categoria));
    } else {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    }
  };

  return (
    <div className="mb-4">
      <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>Filtros</h4>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: '0.5rem' }}>
        {categoriasUnicas.map(cat => (
          <label 
            key={cat} 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              cursor: 'pointer',
              color: 'var(--text)',
              fontSize: '1rem'
            }}
          >
            <input 
              type="checkbox" 
              checked={categoriasSeleccionadas.includes(cat)}
              onChange={() => manejarCambio(cat)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer',
                accentColor: 'var(--accent)'
              }}
            />
            {cat}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FiltroLibro;