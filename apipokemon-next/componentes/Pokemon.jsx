'use client'
import React, { useState, useEffect } from 'react';

const PokemonList = ({ generation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPokemonByGeneration = async () => {
      try {
        setLoading(true);
        // Fetch generation data from PokéAPI
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`);
        const data = await response.json();

        // Extract Pokémon species names
        const pokemonSpecies = data.pokemon_species.map((species) => species.name);

        // Get 10 random Pokémon names
        const randomPokemonNames = [];
        while (randomPokemonNames.length < 10) {
          const randomIndex = Math.floor(Math.random() * pokemonSpecies.length);
          const pokemon = pokemonSpecies[randomIndex];
          if (!randomPokemonNames.includes(pokemon)) {
            randomPokemonNames.push(pokemon);
          }
        }

        // Fetch details for each Pokémon to get their images
        const detailedPokemon = await Promise.all(
          randomPokemonNames.map(async (name) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const pokemonData = await res.json();
            return {
              name: pokemonData.name,
              image: pokemonData.sprites.front_default, // Main sprite image
            };
          })
        );

        setPokemonList(detailedPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonByGeneration();
  }, [generation]);

  return (
    <div style={{ padding: '20px' }}>
      <h3>Pokémon Generados:</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {pokemonList.map((pokemon, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <img src={pokemon.image} alt={pokemon.name} width={80} height={80} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
