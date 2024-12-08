import React from 'react';
import PokemonList from '../../componentes/Pokemon';

const Gen2 = () => {
  return (
    <div>
      <h2>Generación 2</h2>
      <PokemonList generation={2} />
    </div>
  );
};

export default Gen2;
