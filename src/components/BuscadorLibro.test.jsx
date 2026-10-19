import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BuscadorLibro from './BuscadorLibro';

describe('Componente BuscadorLibro', () => {
  it('debe mostrar el título y el input', () => {
    const handleBusqueda = vi.fn();
    render(<BuscadorLibro busqueda="" setBusqueda={handleBusqueda} />);
    
    expect(screen.getByText('Catálogo de Libros')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Buscar por título, autor o palabra clave...')).toBeInTheDocument();
  });
});