import React, { Component } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {logo64, middleImg} from "../../images/images";
import './LandingPage.css'

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
    <div className='landing-wrapper'>
        <Container fluid className='landing-cont'>
            <Row className='landing-header'>
              <Col md={1}><img src={logo64} alt="logo"/></Col>
              <Col md={7}><h2 className='align-middle'>Decentralized Voting System</h2></Col>
            </Row>
            <Row className='mt-auto landing-body'>
              <Col md={8}><img src={middleImg} alt="middle image"/></Col>
            </Row>
            <Row className='mt-1 mb-auto mr-auto ml-auto'>
              <Col xl={6} className='mt-1'><button className="align-middle signin-btn" size="lg">SIGN IN</button></Col>
              <Col xl={6} className='mt-1'><button className="align-middle register-btn" size="lg">REGISTER</button></Col>
            </Row>
        </Container>
    </div>
    );
  }
}
export default LandingPage;