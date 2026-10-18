import React from 'react';

const BloqueInput = ({ tipo, placeholder, valor, alCambiar }) => {
  return (
    <input 
      type={tipo} 
      placeholder={placeholder} 
      value={valor} 
      onChange={alCambiar} 
      required 
      style={{ 
        padding: '0.8rem', 
        borderRadius: '4px', 
        border: '1px solid var(--border)',
        width: '100%',
        boxSizing: 'border-box'
      }}
    />
  );
};

export default BloqueInput;