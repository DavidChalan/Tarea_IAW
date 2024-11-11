import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import heroes from './heroes.json';
import styles from './heroes.module.css';

export default function HeroAutocomplete() {
  const [hero, setHero] = React.useState('');
  const filteredHeroes = heroes.filter(hero => hero.publisher === 'Marvel Comics');

  return (
    <Box className={styles.box} sx={{ width: '100%', maxWidth: 500 }}>
      <Autocomplete
        value={hero}
        onChange={(event, newValue) => {
          setHero(newValue);
        }}
        options={filteredHeroes.map(hero => hero.superhero)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Heroes"
            className={styles.textField}
            sx={{ width: '100%' }} // Asegura que el TextField ocupe todo el ancho del contenedor
          />
        )}
        sx={{ width: '100%' }} // Asegura que el Autocomplete ocupe todo el ancho del contenedor
      />
    </Box>
  );
}
