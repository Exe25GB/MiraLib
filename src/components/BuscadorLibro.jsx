import React from 'react';
import BloqueInput from './BloqueInput';

const BuscadorLibro = ({ busqueda, setBusqueda }) => {
  return (
    <div className="mb-4 w-100">
      <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase' }}>Catálogo de Libros</h4>
      <BloqueInput 
        tipo="text" 
        placeholder="Buscar por título, autor o palabra clave..." 
        valor={busqueda} 
        alCambiar={(e) => setBusqueda(e.target.value)} 
      />
    </div>
  );
};

export default BuscadorLibro;