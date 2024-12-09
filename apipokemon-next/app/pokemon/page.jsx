'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Para la redirección
import NavBar from '@/componentes/NavBar'; // Navbar único
import { getDictionary } from '@/componentes/diccionario';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Page() {
  const [pokemon, setPokemon] = useState(null); // Estado del Pokémon actual
  const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar modal
  const [idioma, setIdioma] = useState('es'); // Estado del idioma
  const dict = getDictionary(idioma); // Diccionario dinámico
  const router = useRouter(); // Para navegación dinámica

  // Obtener un Pokémon aleatorio
  const fetchRandomPokemon = async () => {
    try {
      const randomId = Math.floor(Math.random() * 1000) + 1; // ID aleatorio
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await res.json();

      // Guardar datos relevantes del Pokémon
      setPokemon({
        id: data.id,
        number: `#${data.id.toString().padStart(3, '0')}`,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default,
        hp: data.stats[0].base_stat,
        attack: data.stats[1].base_stat,
        defense: data.stats[2].base_stat,
        type: data.types.map((typeInfo) => typeInfo.type.name).join(', '),
      });
    } catch (error) {
      console.error('Error al obtener el Pokémon:', error);
    }
  };

  // Cargar un Pokémon al montar el componente
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Cambiar el idioma
  const changeLanguage = (lang) => {
    setIdioma(lang);
  };

  // Abrir el modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Cerrar el modal y redirigir a Home con un nuevo Pokémon
  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/pokemon'); // Redirigir a la página principal
    fetchRandomPokemon(); // Generar un nuevo Pokémon
  };

  return (
    <div>
      {/* Título dinámico */}
      <h1 className="text-center">{dict.title}</h1>
      
      {/* Contenedor principal con flexbox */}
      <div className="d-flex justify-content-center align-items-start min-vh-100 p-3">
        {/* Card alineada en la parte superior, centrada horizontalmente y más grande */}
        <div className="card" style={{ width: '30rem', marginTop: '50px', padding: '20px' }}>
          <div className="card-body text-center">
            
            {/* Mostrar datos del Pokémon */}
            {pokemon ? (
              <div>
                <img src={pokemon.image} alt={pokemon.name} width={250} height={250} />
                <h6>{pokemon.number} - {pokemon.name}</h6>
                <Button variant="primary" onClick={handleShowModal}>
                  {dict.seeMore || '¿Saber más?'}
                </Button>
              </div>
            ) : (
              <p>{dict.loading || 'Cargando Pokémon...'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal para mostrar más detalles */}
      <Modal show={showModal} onHide={handleCloseModal}> {/* Lógica al cerrar el modal */}
        <Modal.Header closeButton>
          <Modal.Title>
            {pokemon ? `${pokemon.name} (${pokemon.number})` : 'Cargando...'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pokemon ? (
            <>
              <img src={pokemon.image} alt={pokemon.name} className="img-fluid" />
              <p><strong>HP:</strong> {pokemon.hp}</p>
              <p><strong>Attack:</strong> {pokemon.attack}</p>
              <p><strong>Defense:</strong> {pokemon.defense}</p>
              <p><strong>Type:</strong> {pokemon.type}</p>
            </>
          ) : (
            <p>{dict.loading || 'Cargando detalles del Pokémon...'}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}> {/* // Redirigir y generar un nuevo Pokémon */}
            {dict.close || 'Cerrar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
