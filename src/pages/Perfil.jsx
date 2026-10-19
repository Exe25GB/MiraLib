import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BotonDirecciones from '../components/BotonDirecciones';
import LibrosPedidos from '../components/LibrosPedidos'; 
import { librosBd } from '../data/libros';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sesionActiva = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (sesionActiva) {
      sesionActiva.pedidos = sesionActiva.pedidos || [];
      setUsuario(sesionActiva);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogeado');
    setUsuario(null);
    navigate('/login'); 
  };

  const guardarCambios = (usuarioActualizado) => {
    setUsuario(usuarioActualizado);
    localStorage.setItem('usuarioLogeado', JSON.stringify(usuarioActualizado));
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.email === usuarioActualizado.email);
    if (index !== -1) {
      usuarios[index] = usuarioActualizado;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  };

  //  DEVOLUCIÓN y STOCK
  const manejarDevolucion = (idLibro) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas devolver este libro?");
    
    if (confirmar) {
      const usuarioActualizado = { ...usuario };
      usuarioActualizado.pedidos = usuarioActualizado.pedidos.filter(p => p.idLibro !== idLibro);
      guardarCambios(usuarioActualizado);

      const stockGlobal = JSON.parse(localStorage.getItem('stockLibros')) || {};
      const libroOriginal = librosBd.find(l => l.id === idLibro);
      
      let stockActual = 0;
      if (stockGlobal[idLibro] !== undefined) {
        stockActual = stockGlobal[idLibro];
      } else if (libroOriginal) {
        stockActual = libroOriginal.stock;
      }
      
      stockGlobal[idLibro] = stockActual + 1;
      localStorage.setItem('stockLibros', JSON.stringify(stockGlobal));

      alert('¡Libro devuelto con éxito! El stock en el catálogo ha aumentado.');
    }
  };

  const manejarResolicitar = (idLibro) => {
    const usuarioActualizado = { ...usuario };
    const pedidoIndex = usuarioActualizado.pedidos.findIndex(p => p.idLibro === idLibro);
    if (pedidoIndex !== -1) {
      const pedido = usuarioActualizado.pedidos[pedidoIndex];
      const partesFecha = pedido.fechaDevolucion.split(/[-/]/); 
      if(partesFecha.length !== 3) return; 
      const fechaDevOriginal = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
      fechaDevOriginal.setDate(fechaDevOriginal.getDate() + 7);
      const strNuevaDev = fechaDevOriginal.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
      usuarioActualizado.pedidos[pedidoIndex].fechaDevolucion = strNuevaDev;
      usuarioActualizado.pedidos[pedidoIndex].estado = "Vigente"; 
      guardarCambios(usuarioActualizado);
      alert('Se ha extendido tu plazo de devolución por 7 días más.');
    }
  };

  if (!usuario) {
    return (
      <main className="container text-center" style={{ padding: '6rem 2rem' }}>
        <h2>No has iniciado sesión</h2>
        <p className="mt-3 mb-5">Para ver tu perfil y tus libros pedidos en MiraLib, necesitas identificarte.</p>
        <Link to="/login" className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', fontWeight: 'bold' }}>
          Ir a Iniciar Sesión
        </Link>
      </main>
    );
  }

  return (
    <main className="container" style={{ padding: '3rem 0', maxWidth: '1000px' }}>
      
      <div 
        className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 pb-3" 
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-md-4">
          <h1 className="mb-2 mb-md-0" style={{ margin: 0 }}>Mi Perfil</h1>
          <p className="mb-0" style={{ fontSize: '1.1rem' }}>
            <span style={{ color: 'var(--text-h)' }}>{usuario.nombre}</span> ({usuario.email})
          </p>
        </div>
        
        <div className="mt-3 mt-md-0">
          <BotonDirecciones texto="Cerrar Sesión" onClick={cerrarSesion} colorFondo="transparent" colorTexto="red" ancho="fit-content" />
        </div>
      </div>

      <h3 className="mb-4">Libros Pedidos</h3>
      
      {usuario.pedidos.length > 0 ? (
        <div className="d-flex flex-column gap-3">
          {usuario.pedidos.map((pedido, index) => {
            const infoLibro = librosBd.find(l => l.id === pedido.idLibro);
            if(!infoLibro) return null;

            return (
              <LibrosPedidos 
                key={index}
                pedido={pedido}
                infoLibro={infoLibro}
                manejarDevolucion={manejarDevolucion}
                manejarResolicitar={manejarResolicitar}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-4">Aún no has pedido ningún libro.</p>
      )}
      
    </main>
  );
};

export default Perfil;