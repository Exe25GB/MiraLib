import React from 'react';

const Nosotros = () => {
  return (
    <main className="pagina-nosotros" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
      <h1>Sobre Nosotros</h1>
      
      <section className="info-nosotros" style={{ maxWidth: '800px', margin: '0 auto', marginTop: '2rem' }}>

        <h3 style={{ marginTop: '2rem' }}>¡Bienvenido a Miralib!</h3>
        <p>
          Somos una plataforma dedicada a gestionar consultas de catálogos bibliográficos digital gratuito,
          estara diseñado para que puedas organizar, descubrir y gestionar una gestión de colección de libros,
          vas a poder compartir e interactuar con obras literarias de todo tipo. 
        </p>
        
        <h3 style={{ marginTop: '2rem' }}>Nuestra Misión</h3>
        <p>
           Nuestra misión es poder dar a acceso al compartimiento temporal de libros,
           Para poder ofrecerles a los usuarios conocimiento y aprendizaje a traves de internet sin la necesidad de gastar dinero.
        </p>

        <h3 style={{ marginTop: '2rem' }}>Creadores de la pagina</h3>
         <p>Víctor Godoy</p>
         <p>Exequiel Guzman</p>

      </section>
    </main>
  );
};

export default Nosotros;