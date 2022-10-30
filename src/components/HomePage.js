import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignIn from "./SignIn";
import Registeration from "./Registeration";
import "./HomePage.css";
import logo from "../assets/images/logo.png";
import middleImg from "../assets/images/middle-img.png";
import React, {useState} from "react";

function HomePage() {
 const [signIn, setSignIn] = useState(false);
 const [reg, setReg] = useState(false);
 const [sPageCols, setSPageCols] = useState(0); 
 const [hPageCols, setHPageCols] = useState(12);
 const [hPagePadding, setHPagePadding] = useState('0% 25% 0% 25%');
 const [rPageCols, setRPageCols] = useState(0);

// const [signIn, setSignIn] = useState(false);
// const [reg, setReg] = useState(true);
// const [sPageCols, setSPageCols] = useState(8); 
// const [hPageCols, setHPageCols] = useState(8);
// const [hPagePadding, setHPagePadding] = useState('0% 0% 0% 0%');
// const [rPageCols, setRPageCols] = useState(3);

 function handleChange(event) {
  if(event.target.innerText == "Sign In")
  {
    setHPagePadding('0% 0% 0% 0%');
    setSPageCols(3);
    setHPageCols(8);
    setRPageCols(0);
    setSignIn(true);
    setReg(false);
  }
  else if(event.target.innerText == "Register")
  {
    setHPagePadding('0% 0% 0% 0%');
    setSPageCols(0);
    setHPageCols(8);
    setRPageCols(3);
    setReg(true);
    setSignIn(false);
  }
}

  return (

    <div className="wrapper">
      <Container className="header">
        <Row className="mx-3">
          <Row>
            <Col md={1} className="logo"><img src={logo} alt="logo" /></Col>
            <Col>
            <h1>Decentralized Voting System</h1>
            </Col>
          </Row>
        </Row>

        <Row className="home">
          {signIn &&
          <Col md={sPageCols} className='signin-page'>
            <SignIn/>
          </Col>
          }
          <Col md={hPageCols} className="home-page" style={{padding : hPagePadding}}>
            <Row>
              <img className="middle-img" src={middleImg} alt="election home page image" />
            </Row>

            {!signIn && !reg && <Row className="home-page-btns">
              <Col className="signin-btn"> <button onClick={handleChange}>Sign In</button> </Col>
              <Col className="reg-btn"> <button onClick={handleChange}>Register</button> </Col>
            </Row>}
          </Col>

          {reg && 
          <Col md={rPageCols} className='reg-page'>
            <Registeration/>
          </Col>}
        </Row>

      </Container>
    </div>
  );
}

export default HomePage;
