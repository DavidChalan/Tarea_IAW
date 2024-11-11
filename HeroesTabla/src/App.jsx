import React from 'react';
import HeroesList from './HeroesTabla';


const App = () => {
  return (
    <div>
      <h1>Tabla de Héroes</h1>
      <HeroesList publisher="Marvel Comics" />
    </div>
  );
};

export default App;
