import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logo_white.svg';

const BarraNavegacion = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logoWhite} alt="Mi Logo" height="40" />
        </Link>
      </div>
      
      <ul className={`navbar-links ${menuAbierto ? 'activo' : ''}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/libros">Libros</Link></li>
        <li><Link to="/nosotros">Nosotros</Link></li>
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
      
    </nav>
  );
};

export default BarraNavegacion;