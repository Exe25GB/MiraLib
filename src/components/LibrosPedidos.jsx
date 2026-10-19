import React from 'react';

const LibrosPedidos = ({ pedido, infoLibro, manejarDevolucion, manejarResolicitar }) => {
  
  const esDevuelto = pedido.estado === "Devuelto";
  const colorEstado = esDevuelto ? 'gray' : (pedido.estado === 'Vencido' ? 'red' : 'inherit');
  const opacidad = esDevuelto ? '0.6' : '1';

  return (
    <div 
      className="card p-3 d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3" 
      style={{ backgroundColor: 'transparent', borderColor: 'var(--border)', opacity: opacidad }}
    >
      
      <div className="d-flex align-items-center gap-3">
        <img 
          src={infoLibro.imagen} 
          alt={`Portada de ${infoLibro.titulo}`} 
          style={{ width: '70px', borderRadius: '4px', objectFit: 'cover' }} 
        />
        <div>
          <h5 className="mb-1" style={{ color: 'var(--text-h)' }}>{infoLibro.titulo}</h5>
          <p className="mb-0" style={{ fontSize: '0.9rem', color: 'gray' }}>
            <strong>Pedido:</strong> {pedido.fechaPedido} <br />
            <strong>{esDevuelto ? 'Estado:' : 'Devolución:'}</strong> 
            <span style={{ color: colorEstado, fontWeight: esDevuelto ? 'bold' : 'normal', marginLeft: '5px' }}>
              {pedido.fechaDevolucion}
            </span>
          </p>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-end">
        <button 
          onClick={() => manejarDevolucion(infoLibro.id)} 
          className="btn btn-sm" 
          style={{ border: '1px solid var(--accent)', color: 'var(--text)' }}
          disabled={esDevuelto}
        >
          {esDevuelto ? 'Entregado' : 'Devolver'}
        </button>
        <button 
          onClick={() => manejarResolicitar(infoLibro.id)} 
          className="btn btn-sm" 
          style={{ backgroundColor: 'var(--accent)', color: 'white' }}
          disabled={esDevuelto}
        >
          Re-Solicitar
        </button>
      </div>

    </div>
  );
};

export default LibrosPedidos;