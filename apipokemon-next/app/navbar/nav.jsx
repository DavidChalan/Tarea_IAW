import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const NavBar = ({ onHomeClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Mi Proyecto</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {/* Home con funcionalidad de Pokémon aleatorio */}
          <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
          <NavDropdown title="Servicios" id="basic-nav-dropdown">
            <NavDropdown.Item href="/gen1">gen 1</NavDropdown.Item>
            <NavDropdown.Item href="/gen2">gen 2</NavDropdown.Item>
            <NavDropdown.Item href="/gen3">gen 3</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
