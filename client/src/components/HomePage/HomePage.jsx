import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../contexts/contexts";
import { ballotboxIcon, createpollIcon, resultsIcon } from "../../images/images";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";

// Home Page Button
let HomePageBtn = (props) => {
  const navigate = useNavigate();
  return (
    <Col md={3} className="mb-3 homepage-btns-col">
      <button
        className="align-middle homepage-btn"
        onClick={() => {
          navigate(props.navTo);
        }}
      >
        <div>
          <img src={props.btnIcon} alt="btn icon" />
          <h3>{props.btnTxt}</h3>
        </div>
      </button>
    </Col>
  );
};

function HomePage() {
  const { userName, loginStatus } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(!loginStatus)
      navigate("/");
  },);
  return (
    <>
      {loginStatus && (
        <div className="homepage-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle="Home" userName={userName}></Navbar>

          {/*---------- PAGE SITE ------------*/}
          <Container className="homepage-btns-cont">
            <Row className="mt-auto mb-auto homepage-btns-row">
              <HomePageBtn
                navTo={"/Elections"}
                btnTxt={"ELECTIONS"}
                btnIcon={ballotboxIcon}
              />
              <HomePageBtn
                navTo={"/Results"}
                btnTxt={"RESULTS"}
                btnIcon={resultsIcon}
              />

              {/* TODO:: ADMIN NEED TO SEPERATE FROM REST OF USERS */}
              <HomePageBtn
                navTo={"/CreatePoll"}
                btnTxt={"CREATE POLL"}
                btnIcon={createpollIcon}
              />
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default HomePage;
