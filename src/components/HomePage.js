import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HomePage.css';
import logo from '../assets/images/logo.png'
import middleImg from '../assets/images/middle-img.png'

function HomePage() {
  return (
    <div className='wrapper'>
    <Container className='header-new'>
      <Row className='mx-3'>
        <Row className='mx-3'><h1>Decentralized Voting System</h1></Row>
        {/* <Col></Col> */}
      </Row>
      <Row className='mx-3'>
      <img className='logo' src={logo} alt="logo" />
      </Row>
      <Row>
        <Col className='hero'>
          <Row>
            <img className='middleImg' src={middleImg} alt="middle Image" />
          </Row>
          <Row className='hero-btns'>
            <Col className='signIn-btn'><button >Sign In</button></Col>
            <Col  className='reg-btn'><button>Register</button></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>

    
    // <div className='wrapper'>
    //   <div className='header'>
    //     <ul>
    //     <li><h1>Decentralized Voting System</h1></li>
    //     <li><img className='logo' src={logo} alt="logo" /></li>
    //     </ul>
    //   </div>
    //   <div className='hero'>
    //     <div>
    //       <img className='middleImg' src={middleImg} alt="middle Image" />
    //       <button>Register</button>
    //       <button>Sign In</button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default HomePage;