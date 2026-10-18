import React from 'react';

const Perfil = () => {
  return (
    <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h1>Mi Perfil</h1>
      
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <h3>Informacion del Usuario</h3>
          <p>Nombre: Lector Invitado</p>
          <p>Correo: ***@gmail.com</p>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Mis Libros Guardados</h3>
          <p>Aun no has guardado ningún libro en tu lista de favoritos.</p>
        </div>
      </div>
    </main>
  );
};

export default Perfil;