import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const MainNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 main-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          User List App
        </Navbar.Brand>
        <Nav className="me-auto nav-links-custom">
          <Nav.Link 
            as={Link} 
            to="/" 
            className={`nav-link-custom ${isActive('/') ? 'active' : ''}`}
          >
            Users
          </Nav.Link>
          <Nav.Link 
            as={Link} 
            to="/tasks" 
            className={`nav-link-custom ${isActive('/tasks') ? 'active' : ''}`}
          >
            Tasks
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default MainNav; 