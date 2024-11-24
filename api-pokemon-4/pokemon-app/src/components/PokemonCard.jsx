import PropTypes from 'prop-types';
import './pokemonCards.css';

// Componente que muestra la información de un Pokémon en formato de tarjeta
const PokemonCard = ({ id, nombre, imagen, tipo, habilidades, estadisticas }) => {
  return (
    <div className='pokemon-card'>
      <img src={imagen} alt={nombre} className='pokemon-imagen' />
      <p className='pokemon-titulo'>
        <span>#{id}</span>
        <span>{nombre}</span>
      </p>
      <p><strong>Tipo:</strong> {tipo}</p>
      <p><strong>Habilidades:</strong> {habilidades}</p>
      <div>
        <strong>Estadísticas:</strong>
        <ul>
          {estadisticas.map((stat, index) => (
            <li key={index}>{stat.nombre}: {stat.valor}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Definir las PropTypes para el componente PokemonCard
PokemonCard.propTypes = {
  id: PropTypes.number.isRequired,
  nombre: PropTypes.string.isRequired,
  imagen: PropTypes.string.isRequired,
  tipo: PropTypes.string.isRequired,
  habilidades: PropTypes.string.isRequired,
  estadisticas: PropTypes.arrayOf(PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    valor: PropTypes.number.isRequired,
  })).isRequired,
};

export default PokemonCard;
