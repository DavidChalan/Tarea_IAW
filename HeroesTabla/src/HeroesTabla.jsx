import React from 'react';
import PropTypes from 'prop-types';
import heroes from './heroes.json';
import './HeroesList.css';

// A separate component for each hero row to improve readability and reusability.
const HeroRow = ({ hero }) => (
    <tr>
        <td>{hero.superhero}</td>
        <td>{hero.publisher}</td>
        <td>{hero.alter_ego}</td>
        <td>{hero.first_appearance}</td>
        <td>{hero.characters}</td>
    </tr>
);

HeroRow.propTypes = {
    hero: PropTypes.shape({
        superhero: PropTypes.string.isRequired,
        publisher: PropTypes.string.isRequired,
        alter_ego: PropTypes.string,
        first_appearance: PropTypes.string,
        characters: PropTypes.string,
    }).isRequired,
};

const HeroesList = ({ publisher }) => {
    const filteredHeroes = heroes.filter(hero => hero.publisher === publisher);

    return (
        <div className="heroes-list">
            <h1 className="heroes-list__title">Lista de Héroes</h1>
            {filteredHeroes.length > 0 ? (
                <table className="heroes-list__table" aria-label="Lista de Héroes">
                    <thead>
                        <tr>
                            <th scope="col">Superhéroe</th>
                            <th scope="col">Editorial</th>
                            <th scope="col">Alter Ego</th>
                            <th scope="col">Primera Aparición</th>
                            <th scope="col">Personajes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHeroes.map((hero, index) => (
                            <HeroRow key={index} hero={hero} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="heroes-list__no-results">No hay héroes para mostrar.</p>
            )}
        </div>
    );
};

HeroesList.propTypes = {
    publisher: PropTypes.string.isRequired,
};

export default HeroesList;
