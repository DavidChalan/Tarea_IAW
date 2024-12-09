'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Modal, Button } from 'react-bootstrap'; // Importar Modal y Button desde react-bootstrap

export default function Gen3() {
  const [pokemons, setPokemons] = useState([]); // Estado para almacenar 10 Pokémon
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el Modal
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon seleccionado para mostrar en el Modal
  const router = useRouter(); // Para navegación dinámica

  // Función para obtener 10 Pokémon únicos aleatorios de la Gen 3
  const fetchUniqueRandomPokemons = async () => {
    try {
      const uniqueIds = new Set();

      while (uniqueIds.size < 10) {
        uniqueIds.add(Math.floor(Math.random() * (386 - 252 + 1)) + 252); // Rango 252 a 386
      }

      const promises = Array.from(uniqueIds).map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        return {
          number: `#${data.id.toString().padStart(3, '0')}`,
          id: data.id,
          name: data.name,
          image: data.sprites.other['official-artwork'].front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          type: data.types.map((typeInfo) => typeInfo.type.name).join(', '),
        };
      });

      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (error) {
      console.error('Error al obtener los Pokémon:', error);
    }
  };

  // Llamar a fetchUniqueRandomPokemons cuando se monta el componente
  useEffect(() => {
    fetchUniqueRandomPokemons();
  }, []);

  // Función para manejar el clic en "Saber más"
  const handleSeeMore = (pokemon) => {
    setSelectedPokemon(pokemon); // Establece el Pokémon seleccionado
    setShowModal(true); // Muestra el Modal
  };

  // Función para cerrar el Modal y redirigir al inicio
  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/pokemon'); // Redirige al /pokemon al cerrar el Modal
  };

  return (
    <div>
{/* estilos className */}
      <h1 className="text-center">Pokémon Generación 3</h1>
      {pokemons.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {pokemons.map((pokemon) => (
            <div className="card" key={pokemon.id} style={{ width: '18rem' }}>
              <img src={pokemon.image} alt={pokemon.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text">{pokemon.number}</p>
                <Button variant="primary" onClick={() => handleSeeMore(pokemon)}>
                  ¿Saber más?
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando Pokémon...</p>
      )}

      {/* Modal para mostrar detalles del Pokémon */}
      {selectedPokemon && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedPokemon.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="img-fluid"
            />
            <p><strong>HP:</strong> {selectedPokemon.hp}</p>
            <p><strong>Attack:</strong> {selectedPokemon.attack}</p>
            <p><strong>Defense:</strong> {selectedPokemon.defense}</p>
            <p><strong>Type:</strong> {selectedPokemon.type}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
