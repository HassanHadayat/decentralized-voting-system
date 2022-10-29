import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomePage.css";
import logo from "../assets/images/logo.png";
import middleImg from "../assets/images/middle-img.png";

function HomePage() {
  return (
    <div className="wrapper">
      <Container className="header">
        <Row className="mx-3">
          <Row className="mx-3">
            <h1>Decentralized Voting System</h1>
          </Row>
        </Row>

        <Row className="mx-3">
          <img className="logo" src={logo} alt="logo" />
        </Row>

        <Row>
          <Col className="home-page">
            <Row>
              <img className="middle-img" src={middleImg} alt="election home page image" />
            </Row>
            <Row>
              <Col className="signin-btn"> <button>Sign In</button> </Col>
              <Col className="reg-btn"> <button>Register</button> </Col>
            </Row>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default HomePage;
