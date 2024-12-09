'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Gen1() {
  const [pokemons, setPokemons] = useState([]); // Estado para almacenar 10 Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Estado para el Pokémon seleccionado
  const [showModal, setShowModal] = useState(false); // Estado para mostrar u ocultar el modal
  const router = useRouter(); // Para navegación dinámica

  // Función para obtener 10 Pokémon únicos aleatorios de la Gen 1
  const fetchUniqueRandomPokemons = async () => {
    try {
      const uniqueIds = new Set();

      while (uniqueIds.size < 10) {
        uniqueIds.add(Math.floor(Math.random() * 150) + 1); // Pokémon aleatorios entre los primeros 150
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

  // Llamar a la función al montar el componente
  useEffect(() => {
    fetchUniqueRandomPokemons();
  }, []);

  // Función para manejar el click en "¿Saber más?"
  const handleSeeMore = (pokemon) => {
    setSelectedPokemon(pokemon); // Guardar el Pokémon seleccionado
    setShowModal(true); // Mostrar el modal
  };

  // Función para cerrar el modal y redirigir a "/pokemon"
  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    router.push('/pokemon'); // Redirigir a la página /pokemon
    fetchUniqueRandomPokemons(); // Generar nuevos Pokémon
  };

  return (
    <div>
      <h1 className="text-center">Pokémon Generación 1</h1>
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

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPokemon?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPokemon && (
            <div>
              <img src={selectedPokemon.image} alt={selectedPokemon.name} className="img-fluid" />
              <p><strong>HP:</strong> {selectedPokemon.hp}</p>
              <p><strong>Attack:</strong> {selectedPokemon.attack}</p>
              <p><strong>Defense:</strong> {selectedPokemon.defense}</p>
              <p><strong>Type:</strong> {selectedPokemon.type}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
