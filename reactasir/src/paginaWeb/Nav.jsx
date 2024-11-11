import React from 'react';
import { IoIosContact } from "react-icons/io";
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SchoolIcon from '@mui/icons-material/School';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

function MyNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/about"><AccountBalanceIcon />Inicio</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/about"><AccountBalanceIcon /> Inicio</Nav.Link> */}
          <NavDropdown title={<span><AssessmentIcon /> Noticias</span>} id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/noticias/jefatura"><SchoolIcon /> Noticias Jefatura</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/noticias/informatica"><ImportantDevicesIcon /> Departamento Informática</NavDropdown.Item>
            {/* <NavDropdown.Item as={Link} to="/noticias/otra"><ViewDayIcon /> OTRA</NavDropdown.Item> */}
          </NavDropdown>
          <Nav.Link as={Link} to="/"><ViewDayIcon /> Galería</Nav.Link>
          <Nav.Link as={Link} to="/about"><IoIosContact /> Contacto</Nav.Link>
          <Nav.Link as={Link} to="/otra"><ViewDayIcon /> OTRA</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
