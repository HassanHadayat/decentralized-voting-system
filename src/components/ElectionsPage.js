import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import "./ElectionsPage.css";
import logo from "../images/logo.png";
import userIcon from "../images/user-icon.png";

class ElectionsPage extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <div className="electionspage-wrapper">
            <Container fluid className="navbar">
          <Col className="page-info">
            <div>
              <img src={logo} alt="logo" height={40} width={40} />
              &nbsp;&nbsp;&nbsp;&nbsp;Elections
            </div>
          </Col>
          <Col className="account-detail">
          <div>
              User
              &nbsp;&nbsp;&nbsp;&nbsp;<img src={userIcon} alt="user-icon" height={40} width={40} />
            </div>
          </Col>
        </Container>
        </div>
      );
    }
}

export default ElectionsPage;