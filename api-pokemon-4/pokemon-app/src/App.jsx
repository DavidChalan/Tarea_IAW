import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Generacion from './components/Generacion';
import Contacto from './components/Contacto';
// import ContactoLayout from './components/ContactoLayout'

// Componente principal de la aplicación que define las rutas y estructura principal
function App() {
  const [update, setUpdate] = useState(false);

  // Función para manejar los clics de navegación y forzar la actualización
  const handleNavClick = () => {
    setUpdate(!update); // Cambiar el estado para forzar la actualización
  };

  return (
    <BrowserRouter>
      <Navbar onNavClick={handleNavClick} />
      <Routes>
        <Route path="/" element={<Home key={update} />} />
        <Route path="/gen1" element={<Generacion gen="1" key={update} />} />
        <Route path="/gen2" element={<Generacion gen="2" key={update} />} />
        <Route path="/gen3" element={<Generacion gen="3" key={update} />} />
        {/* <Route path="/contacto" element={<ContactoLayout />}/> */}
        <Route path="/contacto/:nombre" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
