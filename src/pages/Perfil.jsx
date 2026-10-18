import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// ¡Aquí está la línea que faltaba!
import BotonDirecciones from '../components/BotonDirecciones';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sesionActiva = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (sesionActiva) {
      setUsuario(sesionActiva);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioLogeado');
    setUsuario(null);
    navigate('/login'); 
  };

  // --- VISTA 1: SI NO HA INICIADO SESIÓN ---
  if (!usuario) {
    return (
      <main style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2>No has iniciado sesión</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>
          Para ver tu perfil y tus libros guardados en MiraLib, necesitas identificarte.
        </p>
        <Link to="/login" style={{ 
          padding: '0.8rem 1.5rem', 
          backgroundColor: 'var(--accent)', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}>
          Ir a Iniciar Sesión
        </Link>
      </main>
    );
  }

  // --- VISTA 2: SI TIENE SESIÓN ACTIVA ---
  return (
    <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h1>Mi Perfil</h1>
      
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        
        <div style={{ border: '1px solid var(--border)', padding: '2rem', borderRadius: '8px', minWidth: '300px' }}>
          <h3>Información del Usuario</h3>
          <p style={{ marginTop: '1rem' }}><strong>Nombre:</strong> {usuario.nombre}</p>
          <p ><strong>Correo:</strong> {usuario.email}</p>
          <p style={{ marginTop: '1rem' }}></p>
          <BotonDirecciones texto="Cerrar Sesión" onClick={cerrarSesion} colorFondo="transparent" colorTexto="red" ancho="fit-content"/>
        </div>

        <div>
          <h3>Mis Libros Guardados</h3>
          <p style={{ marginTop: '1rem' }}>Aún no has guardado ningún libro.</p>
        </div>

      </div>
    </main>
  );
};

export default Perfil;