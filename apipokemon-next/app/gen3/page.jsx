import React from 'react';
import PokemonList from '../../componentes/Pokemon';

const Gen3 = () => {
  return (
    <div>
      <h2>Generación 3</h2>
      <PokemonList generation={3} />
    </div>
  );
};

export default Gen3;
