import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BloqueInput from '../components/BloqueInput';
import BotonDirecciones from '../components/BotonDirecciones';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const manejarRegistro = (e) => {
    e.preventDefault(); 

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existe = usuariosExistentes.find(user => user.email === email);
    if (existe) {
      alert('Este correo ya está registrado.');
      return;
    }

    const nuevoUsuario = { nombre, email, password };
    localStorage.setItem('usuarios', JSON.stringify([...usuariosExistentes, nuevoUsuario]));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login'); 
  };

  return (
    <main style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Registrarse</h1>
      
      <form onSubmit={manejarRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <BloqueInput 
          tipo="text" 
          placeholder="Tu Nombre" 
          valor={nombre} 
          alCambiar={(e) => setNombre(e.target.value)} 
        />
        <BloqueInput 
          tipo="email" 
          placeholder="Correo electronico" 
          valor={email} 
          alCambiar={(e) => setEmail(e.target.value)} 
        />
        <BloqueInput 
          tipo="password" 
          placeholder="Contraseña" 
          valor={password} 
          alCambiar={(e) => setPassword(e.target.value)} 
        />
        <BotonDirecciones tipo="submit" texto="Crear cuenta" />
      </form>

      <p style={{ marginTop: '1.5rem' }}>
        ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--accent)' }}>Inicia sesión aquí</Link>
      </p>
    </main>
  );
};

export default Registro;