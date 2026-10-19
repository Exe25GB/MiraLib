import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../assets/logo_white.svg';

const BarraNavegacion = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{ backgroundColor: '#215D43', borderBottom: '1px solid #2E7F5C' }}>
      
      <div className="container">
        
        {/* LOGO Y NOMBRE DEL PROYECTO */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img src={logoWhite} alt="MiraLib Logo" height="40" />
          {/* Aquí agregamos el texto "MiraLib" */}
          <span style={{ 
            color: 'white', 
            fontWeight: 'bold', 
            fontSize: '1.5rem',
            letterSpacing: '1px'
          }}>
            MiraLib
          </span>
        </Link>

        {/* Botón Menú Móvil */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#menuNavegacion" 
          aria-controls="menuNavegacion" 
          aria-expanded="false" 
          aria-label="Alternar menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces */}
        <div className="collapse navbar-collapse" id="menuNavegacion">
          <ul className="navbar-nav ms-auto gap-md-4 text-center mt-3 mt-md-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/libros">Libros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/perfil">Perfil</Link>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default BarraNavegacion;