import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row} from "react-bootstrap";
import useUserContext from "../../contexts/UserContext/useUserContext";
import Navbar from "../../components/Navbar/Navbar";

import { logo, userIcon, ballotboxIcon, createpollIcon, resultsIcon } from "../../images/images"
import "./HomePage.css";
import { useEffect } from "react";
import { useState } from "react";

function HomePage(){

  const navigate = useNavigate();
  const { userName,loginStatus, setLoginStatus } = useUserContext();
   
  return (
    <>
    {loginStatus && 
      <div className="homepage-wrapper">
        
        {/*---------- NAV-BAR ------------*/}
        <Navbar pageTitle="Home" userName={userName}></Navbar>
        {/*---------- PAGE SITE ------------*/}
        <Container className="homepage-btns-cont">
          <Row className="homepage-btns-row">
            <Col className="homepage-btns-col">
              <button className="homepage-btn" onClick={() =>{navigate('/Elections');}}>
                <img src={ballotboxIcon} alt="ballot box icon" />
                <h2>ELECTIONS</h2>
              </button>
            </Col>
            <Col className="homepage-btns-col">
              <button className="homepage-btn" onClick={() =>{navigate('/Results');}}>
                <img src={resultsIcon} alt="results icon" />
                <h2>RESULTS</h2>
              </button>
            </Col>
            <Col className="homepage-btns-col">
              <button className="homepage-btn" onClick={() =>{navigate('/CreatePoll');}}>
                <img src={createpollIcon} alt="create poll icon" />
                <h2>CREATE POLL</h2>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    }
    </>
  );
}

export default HomePage;
