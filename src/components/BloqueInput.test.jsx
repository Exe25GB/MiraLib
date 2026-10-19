import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BloqueInput from './BloqueInput';

describe('Componente BloqueInput', () => {
  it('debe renderizar correctamente con las props', () => {
    render(
      <BloqueInput 
        tipo="email" 
        placeholder="Ingresa tu correo" 
        valor="" 
        alCambiar={() => {}} 
      />
    );
    // Verifica que exista un input con el placeholder dado
    expect(screen.getByPlaceholderText('Ingresa tu correo')).toBeInTheDocument();
  });

  it('debe llamar a la función alCambiar al escribir', () => {
    const handleCambio = vi.fn();
    render(
      <BloqueInput 
        tipo="text" 
        placeholder="Buscar" 
        valor="" 
        alCambiar={handleCambio} 
      />
    );

    const input = screen.getByPlaceholderText('Buscar');
    // Simula que el usuario escribe "Libro"
    fireEvent.change(input, { target: { value: 'Libro' } });
    
    // Verifica que la función fue llamada
    expect(handleCambio).toHaveBeenCalled();
  });
});