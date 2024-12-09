'use client';
import React, { useState } from "react";
import Image from "next/image";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { getDictionary } from "./diccionario";

export default function NavBar({ onLogoClick }) {
  // Estado para el idioma
  const [idioma, setIdioma] = useState('es');

  // Obtener el diccionario según el idioma actual
  const dict = getDictionary(idioma);

  // Función para cambiar el idioma
  const changeLanguage = (lang) => {
    setIdioma(lang);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/pokemon" onClick={onLogoClick}>{dict.inicio}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="/pokemon">{dict.inicio}</Nav.Link> */}
          <NavDropdown title={dict.generaciones} id="basic-nav-dropdown">
            <NavDropdown.Item href="/pokemon/gen1">Gen 1</NavDropdown.Item>
            <NavDropdown.Item href="/pokemon/gen2">Gen 2</NavDropdown.Item>
            <NavDropdown.Item href="/pokemon/gen3">Gen 3</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <button onClick={() => changeLanguage('es')} className="p-2 rounded-full hover:bg-gray-200">
          <Image src="/spain.png" alt="Español" width={24} height={24} />
        </button>
        <button onClick={() => changeLanguage('en')} className="p-2 rounded-full hover:bg-gray-200">
          <Image src="/uk.png" alt="Inglés" width={24} height={24} />
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
}
