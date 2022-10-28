import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './HomePage.css';
import image from './home-page-image.png';

function HomePage() {
  return (
    <div>
    <Navbar className="navbar" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
          <div className="navbar-btns d-flex">
            <Button variant="outline-transparent">Register</Button>
            <Button variant="outline-transparent">Sign In</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <img className='image' src={image} alt="home image"/>
    </div>
  );
}

export default HomePage;