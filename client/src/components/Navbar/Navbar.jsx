import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Dropdown } from "react-bootstrap";
import { useUserContext } from "../../contexts/contexts";
import { logo, userIcon, logoutIcon, settingsIcon } from "../../images/images";
import "./Navbar.css";

function Navbar(props) {
  const { setUserName, setUserCnic, setLoginStatus, loginStatus, setIsAdmin } =
    useUserContext();
  const navigate = useNavigate();

  const OnUserProfile = () => {
    navigate("/UserProfile");
  };
  const OnLogout = () => {
    setUserCnic(0);
    setUserName("");
    setLoginStatus(false);
    setIsAdmin(false);
    navigate("/");
  };
  const NavUserToggle = React.forwardRef(({ onClick }, ref) => (
    <img src={userIcon} alt="user-icon" className="user-img"
    ref = {ref}
    onClick={(e)=>{
      e.preventDefault();
      onClick(e);
    }}/>
  ));
  return (
    // ---------- NAV-BAR ------------
    <Container fluid className="navbar">
      <Row>
        <Col className="left-col">
          <Row>
            <Col xs={1} className="mt-auto mb-auto">
              <img src={logo} alt="logo" />
            </Col>
            <Col className="mt-auto mb-auto">
              <h3>{props.pageTitle}</h3>
            </Col>
          </Row>
        </Col>

        <Col className="right-col">
          <Row>
            <Col xs={1} className="mt-auto mb-auto mr-1 p-0 col-1">
              <Dropdown>
                <Dropdown.Toggle
                  as={NavUserToggle}
                  id="dropdown-custom-components"
                >
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item eventKey="1" onClick={OnUserProfile}> <img src={settingsIcon} alt="settings-icon" />&nbsp;&nbsp;Settings</Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item eventKey="2" onClick={OnLogout}> <img src={logoutIcon} alt="logout-icon" />&nbsp;&nbsp;Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <img src={userIcon} alt="user-icon" /> */}
            </Col>
            <Col xs={10} className="mt-auto mb-auto">
              <h3>{props.userName}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Navbar;
