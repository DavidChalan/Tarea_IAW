// import React from 'react';
import { useParams } from 'react-router-dom';

// Componente que muestra la información de contacto basada en el nombre del parámetro
const Contacto = () => {
  const { nombre } = useParams();

  return (
    <div>
      <p>Nombre: {nombre}</p>
      <img src={`https://avatars.dicebear.com/api/human/${nombre}.svg`} alt={nombre} />
    </div>
  );
};

export default Contacto;
