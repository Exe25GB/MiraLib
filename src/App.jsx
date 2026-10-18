import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BarraNavegacion from './components/BarraNavegacion';

import Nosotros from './pages/Nosotros';
import Inicio from './pages/Inicio';
import Libros from './pages/Libros';
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import Registro from './pages/Registro';
import VistaLibro from './pages/VistaLibro';

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/libros" element={<Libros />} />
          <Route path="/libro/:id" element={<VistaLibro />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/perfil" element={<Perfil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;