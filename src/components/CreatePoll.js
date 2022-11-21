import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import logo from "../images/logo.png";
import camera from "../images/camera.PNG"
import './CreatePoll.css';


class CreatePoll extends Component{

    render(){
        return(
            <>
            <Container fluid className="navbar">
                <div>
                    <img src={logo} alt="logo" height={50} width={50}/>
                    <label htmlFor="create_poll" className="create_poll">CREATE POLL</label>
                </div>
            </Container>
            <Col className="poll_list">
                    <Row>
                        <div className="poll_name">
                        <label htmlFor="poll_name">Poll Name:</label>
                        &nbsp;
                        <input type="textbox" className="pollname"/>
                        </div>
                    </Row>     

                    <Row>
                    <label htmlFor="list" className="_lst">Candidate List: </label>&nbsp;
                        <div className="candidate_list">
                        <input type="textbox" className="poll_list" placeholder= "&nbsp; Enter Candidate Name"/>
                        <img src={camera} alt="camera" />
                        <img src={camera} alt="camera" />
                        <img src={camera} alt="camera" />

                        </div>
                    </Row>           
                </Col>

                <Col>
                </Col>
            </>
        );
    }

}

export default CreatePoll;