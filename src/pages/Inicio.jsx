import React from 'react';
import { Link } from 'react-router-dom';
import { librosBd } from '../data/libros';
import TarjetaLibro from '../components/TarjetaLibro';

const Inicio = () => {
  const librosRecientes = librosBd.slice(0, 3);

  const librosProximamente = [
    {
      id: 101,
      titulo: "Coraline",
      autor: "Neil Gaiman",
      categoria: "Literatura infantil",
      imagen: "https://images.cdn1.buscalibre.com/fit-in/660x660/0b/a9/0ba9cadc466f5329d6abf5a68d76cd1a.jpg"
    },
    {
      id: 102,
      titulo: "Las aventuras de Alicia en el país de las maravillas",
      autor: "Lewis Carroll",
      categoria: "Cuento de hadas",
      imagen: "https://cdnx.jumpseller.com/cafe-entre-paginas/image/48935279/ALICIA_EN_EL_PAIS_DE_LAS_MARAVILLAS_1_.jpeg?1716167664"
    }
  ];

  return (
    <main className="container" style={{ padding: '4rem 0', maxWidth: '1200px' }}>
      
      <div className="text-center mb-5 pb-4">
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'var(--text-h)' }}>MiraLib</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text)', maxWidth: '600px', margin: '0 auto' }}>
          Tu biblioteca digital. Explora, guarda tus favoritos y gestiona tus lecturas de forma rápida e intuitiva.
        </p>
        <div className="mt-4">
          <Link to="/libros" className="btn" style={{ backgroundColor: 'var(--accent)', color: 'white', fontWeight: 'bold', padding: '0.8rem 2rem' }}>
            Ir al Catálogo Completo
          </Link>
        </div>
      </div>
      
      <hr style={{ borderColor: 'var(--border)', margin: '3rem 0', opacity: '0.5' }} />

      <div className="text-center mb-5">
        <h2 style={{ textTransform: 'uppercase', letterSpacing: '2px' }}>Novedades</h2>
        <p style={{ color: 'gray' }}>Descubre lo último que ha llegado a nuestra colección y lo que está por venir.</p>
      </div>

      <div className="mb-5 pb-4">
        <h3 className="mb-4" style={{ color: 'var(--accent)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>
          Recién Agregados
        </h3>
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 justify-content-center">
          {librosRecientes.map(libro => (
            <div className="col" key={libro.id}>
              <TarjetaLibro libro={libro} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-4" style={{ color: 'gray', borderBottom: '2px solid gray', paddingBottom: '0.5rem', display: 'inline-block' }}>
          Próximamente en MiraLib
        </h3>
        
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 justify-content-start">
          {librosProximamente.map(libro => (
            <div className="col" key={libro.id}>
              <div className="card h-100 p-3 text-center" style={{ backgroundColor: 'transparent', borderColor: 'var(--border)', opacity: '0.7' }}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                  <img src={libro.imagen} alt={libro.titulo} style={{ maxHeight: '200px', objectFit: 'contain', borderRadius: '4px' }} />
                  
                  <span style={{ 
                    position: 'absolute', top: '10px', right: '10px', 
                    backgroundColor: '#ffc107', color: 'black', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' 
                  }}>
                    Pronto
                  </span>
                </div>
                <div className="mt-3">
                  <h5 style={{ fontSize: '1rem', color: 'var(--text-h)', margin: '0 0 0.2rem 0' }}>{libro.titulo}</h5>
                  <p style={{ fontSize: '0.8rem', color: 'gray', margin: 0, textTransform: 'uppercase' }}>{libro.autor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default Inicio;