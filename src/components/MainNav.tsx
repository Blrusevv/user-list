import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const MainNav: React.FC = () => {
  const location = useLocation();
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 main-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">User List App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" active={location.pathname === '/'}>Users</Nav.Link>
          <Nav.Link as={Link} to="/tasks" active={location.pathname.startsWith('/tasks')}>Tasks</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNav; 