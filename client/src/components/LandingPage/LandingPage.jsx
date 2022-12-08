import {React, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import middle_img from "../../images/middle-img.png";
import logo from "../../images/logo.png";
import "./LandingPage.css";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";


function LandingPage() {
  
  const [signin, setSignIn] = useState(false);
  const [reg, setReg] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  
  const showRegPanel = () => {
    setReg(true);
    setSignIn(false);
    setLandingPage(false);
}
const showSigninPanel = () => {
  setSignIn(true);
    setReg(false);
    setLandingPage(false);
}
  function handleChange(event) {
    if (event.target.innerText === "Sign In") {
      setSignIn(true);
      setReg(false);
      setLandingPage(false);
    } else if (event.target.innerText === "Register") {
      setReg(true);
      setSignIn(false);
      setLandingPage(false);
    }
  }

  return (
    <>
      <Container className="landingpage-wrapper">
        <Row>
          <div className="name-logo">
            <img src={logo} alt="logo" height={200} />
            <h2>Decentralized Voting System</h2>
          </div>
        </Row>

        <Row className="middle-area">
          {signin && (
            <Col>
              <SignIn showRegPanel={showRegPanel}/>
            </Col>
          )}
          <Col>
            <div className="middle-img">
              <img src={middle_img} alt="mid"/>
            </div>
          </Col>
          {reg && (
            <Col>
              <Register showSigninPanel={showSigninPanel}/>
            </Col>
          )}
        </Row>

        {landingPage && (
          <Row className="landingpage-btns">
            <div className="buttons">
              <button className="signin" size="lg" onClick={handleChange}>
                Sign In
              </button>{" "}
              <button className="register" size="lg" onClick={handleChange}>
                Register
              </button>{" "}
            </div>
          </Row>
        )}
      </Container>
    </>
  );
}

export default LandingPage;