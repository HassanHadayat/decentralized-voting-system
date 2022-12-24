import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../contexts/contexts";
import { logo, userIcon, logoutIcon } from "../../images/images";
import "./Navbar.css";

function Navbar(props) {
  const { setUserName, setUserCnic, setLoginStatus, loginStatus } =
    useUserContext();
  const navigate = useNavigate();

  const OnLogout = () => {
    setUserCnic(0);
    setUserName("");
    setLoginStatus(false);
    console.log(loginStatus);
    navigate("/");
  };

  return (
    // ---------- NAV-BAR ------------
    <Container fluid className="navbar">
      <Row>
        <Col className="left-col">
          <Row>
            <Col xs={1} className='mt-auto mb-auto'>
              <img src={logo} alt="logo" />
            </Col>
            <Col className='mt-auto mb-auto'>
              <h3>{props.pageTitle}</h3>
            </Col>
          </Row>
        </Col>

        <Col className="right-col">
          <Row>
            <Col xs={1} className='mt-auto mb-auto mr-1 p-0 col-1'>
              <img
                src={userIcon}
                alt="user-icon"
              />
            </Col>
            <Col xs={10} className='mt-auto mb-auto'>
              <h3 className="align-middle">{props.userName}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Navbar;
