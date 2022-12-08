import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import useUserContext from "../../contexts/UserContext/useUserContext";
import "./Navbar.css";
import { logo, userIcon, logoutIcon } from "../../images/images";

function Navbar(props) {
  const { setUserName, setUserCnic, setLoginStatus, loginStatus } = useUserContext();
  const navigate = useNavigate();

  const OnLogout = () => {
    setUserCnic(0)
    setUserName("")
    setLoginStatus(false)
    console.log(loginStatus)
    navigate("/")
  };
  
  const OnUserProfile = () => {
    // navigate("/UserProfile")
  };

  return (
    // ---------- NAV-BAR ------------
    <Container fluid className="navbar">
      <Col className="left-col">
        <img src={logo} alt="logo" />
        <h3>{props.pageTitle}</h3>
      </Col>

      <Col className="right-col">
        <h3>{props.userName}</h3>
        <img onClick={OnUserProfile} src={userIcon} alt="user-icon" />
        <button onClick={OnLogout}>
        <img  src={logoutIcon} alt="logout-icon" />
        </button>
      </Col>
    </Container>
  );
}

export default Navbar;
