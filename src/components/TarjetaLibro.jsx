import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TarjetaLibro = ({ libro }) => {
  const navigate = useNavigate();
  // Estado local para manejar el stock en pantalla al instante
  const [stockActual, setStockActual] = useState(libro.stock);

  // Al cargar la tarjeta, revisamos si el localStorage tiene un stock actualizado
  useEffect(() => {
    const stockGuardado = JSON.parse(localStorage.getItem('stockLibros')) || {};
    if (stockGuardado[libro.id] !== undefined) {
      setStockActual(stockGuardado[libro.id]);
    }
  }, [libro.id]);

  const irADetalles = () => navigate(`/libro/${libro.id}`);

  const manejarPedir = (e) => {
    e.stopPropagation(); 
    
    if (stockActual <= 0) {
      alert("Lo sentimos, este libro se encuentra agotado.");
      return;
    }

    let usuarioActual = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (!usuarioActual) {
      alert("Debes iniciar sesión para pedir un libro.");
      navigate('/login');
      return;
    }

    usuarioActual.pedidos = usuarioActual.pedidos || [];
    const yaLoTiene = usuarioActual.pedidos.find(p => p.idLibro === libro.id);
    if (yaLoTiene) {
      alert("Ya tienes este libro en tus pedidos actuales.");
      return;
    }

    const fechaHoy = new Date();
    const fechaDev = new Date();
    fechaDev.setDate(fechaHoy.getDate() + 14); 

    const formatoOpciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const strHoy = fechaHoy.toLocaleDateString('es-CL', formatoOpciones);
    const strDev = fechaDev.toLocaleDateString('es-CL', formatoOpciones);

    const nuevoPedido = {
      idLibro: libro.id,
      fechaPedido: strHoy,
      fechaDevolucion: strDev,
      estado: "Vigente"
    };

    usuarioActual.pedidos.push(nuevoPedido);
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioActual));

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.email === usuarioActual.email);
    if (index !== -1) {
      usuarios[index] = usuarioActual;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    const nuevoStock = stockActual - 1;
    setStockActual(nuevoStock);
    
    const stockGlobal = JSON.parse(localStorage.getItem('stockLibros')) || {};
    stockGlobal[libro.id] = nuevoStock;
    localStorage.setItem('stockLibros', JSON.stringify(stockGlobal));

    alert(`¡Éxito! Has pedido: ${libro.titulo}`);
  };

  const estaAgotado = stockActual <= 0;

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
        transition: 'transform 0.2s ease',
        opacity: estaAgotado ? '0.7' : '1'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <div style={{ height: '260px', display: 'flex', justifyContent: 'center', marginBottom: '1rem', position: 'relative' }}>
        <img 
          src={libro.imagen} 
          alt={`Portada de ${libro.titulo}`} 
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} 
        />
        <span style={{ 
          position: 'absolute', top: '10px', right: '10px', 
          backgroundColor: estaAgotado ? 'red' : 'var(--accent)', 
          color: 'white', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' 
        }}>
          {estaAgotado ? 'Agotado' : `Stock: ${stockActual}`}
        </span>
      </div>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem', flex: 1 }}>
        <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{libro.titulo}</h3>
        <p style={{ color: 'gray', fontSize: '0.85rem', margin: 0, textTransform: 'uppercase' }}>{libro.autor}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button 
          onClick={manejarPedir}
          disabled={estaAgotado} // Bloqueamos el botón si no hay stock
          style={{ 
            padding: '0.6rem', 
            backgroundColor: estaAgotado ? 'gray' : 'transparent', 
            border: estaAgotado ? '1px solid gray' : '1px solid var(--accent)', 
            color: estaAgotado ? 'white' : 'var(--text-h)', 
            borderRadius: '4px',
            cursor: estaAgotado ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
          onMouseEnter={(e) => {
            if(!estaAgotado) {
              e.currentTarget.style.backgroundColor = 'var(--accent-bg)';
              e.currentTarget.style.color = 'white';
            }
          }}
          onMouseLeave={(e) => {
            if(!estaAgotado) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--text-h)';
            }
          }}
        >
          {estaAgotado ? 'Agotado' : 'Pedir'}
        </button>
      </div>
    </div>
  );
};

export default TarjetaLibro;