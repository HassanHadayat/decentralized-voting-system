import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
// import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./HomePage.css";
import logo from "../images/logo.png";
import userIcon from "../images/user-icon.png";
import ballotboxIcon from "../images/ballot-box-icon.png";
import createpollIcon from "../images/create-poll-icon.png";
import resultsIcon from "../images/results-icon.png";

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const navigate = useNavigate();
    return (
      <div className="homepage-wrapper">
        <Container fluid className="navbar">
          <Col className="page-info">
            <div>
              <img src={logo} alt="logo" height={40} width={40} />
              &nbsp;&nbsp;&nbsp;&nbsp;Home
            </div>
          </Col>
          <Col className="account-detail">
          <div>
              User Name
              &nbsp;&nbsp;&nbsp;&nbsp;<img src={userIcon} alt="user-icon" height={40} width={40} />
            </div>
          </Col>
        </Container>

        <div className="homepage-btns">
            <Col className="homepage-btn">
                <button onClick={() =>{navigate('/Elections');}}>
                    <img src={ballotboxIcon} alt="ballot box icon" />
                    <h2>ELECTIONS</h2>
                </button>
            </Col>
            <Col className="homepage-btn">
            <img src={resultsIcon} alt="results icon" />
            <h2>RESULTS</h2>
            </Col>
            <Col className="homepage-btn">
            <img src={createpollIcon} alt="create poll icon" />
            <h2>CREATE POLL</h2>
            </Col>
        </div>
      </div>
    );
  }
}

export default HomePage;
