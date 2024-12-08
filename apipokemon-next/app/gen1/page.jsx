import React from 'react';
import PokemonList from '../../componentes/Pokemon';

const Gen1 = () => {
  return (
    <div>
      <h2>Generación 1</h2>
      <PokemonList generation={1} />
    </div>
  );
};

export default Gen1;
