import { useState, useEffect } from 'react';
import './Home.css'; // Importar el archivo CSS

// Componente que muestra un Pokémon aleatorio en la página de inicio
const Home = () => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    // Función asíncrona para obtener un Pokémon aleatorio
    const obtenerPokemonAleatorio = async () => {
      try {
        const idAleatorio = Math.floor(Math.random() * 100) + 1; // Generar un ID aleatorio entre 1 y 100
        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}`);
        const data = await respuesta.json();

        // Actualizar el estado con los datos del Pokémon
        setPokemon({
          id: data.id,
          nombre: data.name,
          imagen: data.sprites.other.dream_world.front_default,
          tipo: data.types.map(typeInfo => typeInfo.type.name).join(', '), // Obtener los tipos del Pokémon
          habilidades: data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '), // Obtener las habilidades del Pokémon
          estadisticas: data.stats.map(statInfo => ({
            nombre: statInfo.stat.name,
            valor: statInfo.base_stat
          })) // Obtener las estadísticas del Pokémon
        });
      } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
      }
    };

    obtenerPokemonAleatorio();
  }, []);

  return (
    <div className="home-container">
      <h2>Inicio</h2>
      {pokemon ? (
        <div className='home-pokemon-card'>
          <img src={pokemon.imagen} alt={pokemon.nombre} className='home-pokemon-imagen' />
          <p className='home-pokemon-titulo'>
            <span>#{pokemon.id}</span>
            <span>{pokemon.nombre}</span>
          </p>
          <p><strong>Tipo:</strong> {pokemon.tipo}</p>
          <p><strong>Habilidades:</strong> {pokemon.habilidades}</p>
          <div>
            <strong>Estadísticas:</strong>
            <ul>
              {pokemon.estadisticas.map((stat, index) => (
                <li key={index}>{stat.nombre}: {stat.valor}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Home;
