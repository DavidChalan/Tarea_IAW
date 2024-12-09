const dictionaries = {
  en: {
    title: 'This will be a page About Pokemons',
    inicio: 'Home',
    generaciones: 'Generations',
  },
  es: {
    title: 'Esta sera una pagina Sobre Pokemons',
    inicio: 'Inicio',
    generaciones: 'Generaciones',
  }
 }
export const getDictionary = (lang) => dictionaries[lang ]