import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BotonDirecciones from './BotonDirecciones';

describe('Componente BotonDirecciones', () => {
  it('debe renderizar el botón con el texto correcto', () => {
    render(<BotonDirecciones texto="Haz clic aquí" />);
    // Verifica que el texto "Haz clic aquí" esté en el documento
    expect(screen.getByText('Haz clic aquí')).toBeInTheDocument();
  });

  it('debe ejecutar la función onClick cuando se hace clic', () => {
    // vi.fn() crea una función "espía" simulada
    const handleClick = vi.fn(); 
    render(<BotonDirecciones texto="Clic" onClick={handleClick} />);
    
    // Simula un clic en el botón
    const boton = screen.getByText('Clic');
    fireEvent.click(boton);
    
    // Verifica que la función espía fue llamada una vez
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});