import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PokemonCard from './PokemonCard';
import './generacion.css';

// Componente que muestra una lista de Pokémones aleatorios para una generación específica
const Generacion = ({ gen }) => {
  const [pokemones, setPokemones] = useState([]);

  useEffect(() => {
    // Función asíncrona para obtener una lista de Pokémones aleatorios
    const obtenerPokemones = async () => {
      try {
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${Math.floor(Math.random() * 100)}`);
        const data = await respuesta.json();
        const { results } = data;

        // Obtener detalles de cada Pokémon
        const listaDePokemones = await Promise.all(results.map(async (pokemon) => {
          const respuestaDetalle = await fetch(pokemon.url);
          const detallePokemon = await respuestaDetalle.json();

          return {
            id: detallePokemon.id,
            nombre: detallePokemon.name,
            imagen: detallePokemon.sprites.other.dream_world.front_default,
            tipo: detallePokemon.types.map(typeInfo => typeInfo.type.name).join(', '), // Obtener los tipos del Pokémon
            habilidades: detallePokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '), // Obtener las habilidades del Pokémon
            estadisticas: detallePokemon.stats.map(statInfo => ({
              nombre: statInfo.stat.name,
              valor: statInfo.base_stat
            })) // Obtener las estadísticas del Pokémon
          };
        }));

        // Actualizar el estado con la lista de Pokémones
        setPokemones(listaDePokemones);
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
      }
    };

    obtenerPokemones();
  }, [gen]);

  return (
    <div>
      <h2 className='titulo'>Generación {gen}</h2>
      <div className="pokemon-container">
        {pokemones.map(pokemon => <PokemonCard key={pokemon.id} {...pokemon} />)}
      </div>
    </div>
  );
};

// Definir las PropTypes para el componente Generacion
Generacion.propTypes = {
  gen: PropTypes.string.isRequired,
};

export default Generacion;
