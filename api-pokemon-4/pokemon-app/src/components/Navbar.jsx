import {useState, useEffect} from "react"; 
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Luna, Sol } from "./Icons";
import './navbar.css';
import logoGif from '../assets/Pokemon-23-11-2024.gif'


// Componente de navegación que contiene enlaces a diferentes rutas
const Navbar = ({ onNavClick }) => {

    const [tema, setTema] = useState('claro')

    const hadleChange= (e) => setTema(e.target.checked ? 'oscuro' : 'claro');

    useEffect(() => {
        document.body.setAttribute('data-tema', tema);
    },[tema]);

    return (
        <nav>
            {/* <Logo /> */}
            <img src={logoGif} alt="Logo" className="logo" />
            <li>
                <a><Link to="/" onClick={onNavClick}>Inicio</Link></a>
                <a><Link to="/gen1" onClick={onNavClick}>Gen1</Link></a>
                <a><Link to="/gen2" onClick={onNavClick}>Gen2</Link></a>
                <a><Link to="/gen3" onClick={onNavClick}>Gen3</Link></a>
                <a><Link to="/contacto" onClick={onNavClick}>Contacto</Link></a>
            </li>
            <div className="switch">
                <Sol />
                <label>
                    <input type="checkbox" className='check-switch' onChange={hadleChange} hidden/>
                    <span className='slider'></span>
                </label>
                <Luna />
            </div>
        </nav>
    );
};

// Definir las PropTypes para el componente Navbar
Navbar.propTypes = {
    onNavClick: PropTypes.func.isRequired,
};

export default Navbar;
