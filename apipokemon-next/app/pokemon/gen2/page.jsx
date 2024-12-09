'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'; // Importamos el componente Card de Bootstrap

export default function Gen2() {
  const [pokemons, setPokemons] = useState([]); // Estado para almacenar 10 Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Pokémon seleccionado para el modal
  const [showModal, setShowModal] = useState(false); // Controla si el modal está visible
  const router = useRouter(); // Para navegación dinámica

  // Función para obtener 10 Pokémon únicos aleatorios de la Gen 2
  const fetchUniqueRandomPokemons = async () => {
    try {
      const uniqueIds = new Set();

      while (uniqueIds.size < 10) {
        uniqueIds.add(Math.floor(Math.random() * (251 - 151 + 1)) + 151); // Rango 151 a 251
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

  // Función para manejar el clic en "¿Saber más?"
  const handleSeeMore = (pokemon) => {
    setSelectedPokemon(pokemon); // Guardar el Pokémon seleccionado
    setShowModal(true); // Mostrar el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false); // Oculta el modal
    router.push('/pokemon'); // Redirige a la página inicial
    fetchUniqueRandomPokemons(); // Genera nuevos Pokémon
  };

  return (
    <div>
      <h1 className="text-center">Pokémon Generación 2</h1>
      {pokemons.length > 0 ? (
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {/* Usamos d-flex y flex-wrap para organizar las cards en filas */}
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={pokemon.image} alt={pokemon.name} />
              <Card.Body>
                <Card.Title>{pokemon.name}</Card.Title>
                <p className="card-text">{pokemon.number}</p>
                <Button variant="primary" onClick={() => handleSeeMore(pokemon)}>
                  ¿Saber más?
                </Button>
              </Card.Body>
            </Card>
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
              <img
                src={selectedPokemon.image}
                alt={selectedPokemon.name}
                className="img-fluid"
              />
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
