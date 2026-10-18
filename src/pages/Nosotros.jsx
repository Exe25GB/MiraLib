import React from 'react';

const Nosotros = () => {
  return (
    <main className="pagina-nosotros" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h1>Sobre Nosotros</h1>
      
      <section className="info-nosotros" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '2rem' }}>
        <h2>Bienvenidos a MiraLib</h2>
        <p>
          Somos una plataforma dedicada a transformar la experiencia de lectura. 
          Nuestro catálogo digital de biblioteca está diseñado para que puedas organizar, 
          descubrir y gestionar tu colección de libros de forma rápida e intuitiva.
        </p>
        
        <h3 style={{ marginTop: '2rem' }}>Nuestra Misión</h3>
        <p>
          Facilitar el acceso al conocimiento y la literatura mediante el acceso a libros digitales.
        </p>
      </section>
    </main>
  );
};

export default Nosotros;