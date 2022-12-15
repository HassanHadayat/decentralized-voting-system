import { React, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {logo64, middleImg} from "../../images/images";
import {SignIn, Register} from "../pages"
import './LandingPage.css'

function LandingPage() {
  
  const [isSignin, setIsSignin] = useState(false);
  const [isReg, setIsReg] = useState(false);
  const [isLanding, setIsLanding] = useState(true);

  
  const showRegPanel = () => {
    setIsReg(true);
    setIsSignin(false);
    setIsLanding(false);
}
const showSigninPanel = () => {
  setIsSignin(true);
    setIsReg(false);
    setIsLanding(false);
}
  function handleChange(event) {
    if (event.target.innerText === "sign in") {
      setIsSignin(true);
      setIsReg(false);
      setIsLanding(false);
    } else if (event.target.innerText === "register") {
      setIsReg(true);
      setIsSignin(false);
      setIsLanding(false);
    }
  }

    return (
    <div className='landing-wrapper'>
        <Container fluid className='landing-cont'>
            <Row className='landing-header'>
              <Col md={1}><img src={logo64} alt="logo"/></Col>
              <Col md={7}><h2 className='align-middle'>Decentralized Voting System</h2></Col>
            </Row>
            <Row className='mt-auto mb-auto landing-body'>
              {isSignin && <Col md={4}><SignIn showRegPanel={showRegPanel}/></Col>}
              <Col md={8}><img className='middle-img' src={middleImg} alt="middle image"/></Col>
              {isReg &&<Col md={4}><Register showSigninPanel={showSigninPanel}/></Col>}
            </Row>
            {isLanding && <Row className='mt-1 mb-auto mr-auto ml-auto'>
              <Col xl={6} className='mt-1'><button className="align-middle signin-btn" size="lg" onClick={handleChange}>sign in</button></Col>
              <Col xl={6} className='mt-1'><button className="align-middle register-btn" size="lg" onClick={handleChange}>register</button></Col>
            </Row>}
        </Container>
    </div>
    );
  }

export default LandingPage;