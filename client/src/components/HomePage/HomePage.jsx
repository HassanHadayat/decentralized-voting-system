import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import { useUserContext } from "../../contexts/contexts";
import {
  ballotboxIcon,
  createpollIcon,
  resultsIcon,
  candidatesIcon,
} from "../../images/images";
import Navbar from "../../components/Navbar/Navbar";
import "./HomePage.css";
import NotifiationsPage from "../Notifications/NotificationsPage";

// Home Page Button
let HomePageBtn = (props) => {
  const navigate = useNavigate();
  return (
    <Row md={3} className="mb-3 homepage-btns-col">
      <button
        className="align-middle homepage-btn"
        onClick={() => {
          navigate(props.navTo);
        }}
      >
        <div className="image_text">
          <img src={props.btnIcon} alt="btn icon" />
          <h3>{props.btnTxt}</h3>
        </div>
      </button>
    </Row>
  );
};

function HomePage() {
  const { userName, loginStatus, isAdmin } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loginStatus) navigate("/");
  });
  return (
    <>
      {loginStatus && (
        <div className="homepage-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle="Home" userName={userName}></Navbar>

          {/*---------- PAGE SITE ------------*/}
          <Container className="homepage-btns-cont">
            <Row>
            <Col>
            <NotifiationsPage/>
            </Col>
            <Col className="mt-auto mb-auto homepage-btns-row">
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
              <HomePageBtn
                navTo={"/Candidates"}
                btnTxt={"CANDIDATES"}
                btnIcon={candidatesIcon}
              />

              {/* TODO:: ADMIN NEED TO SEPERATE FROM REST OF USERS */}
              {isAdmin && (
                <HomePageBtn
                  navTo={"/CreatePoll"}
                  btnTxt={"CREATE POLL"}
                  btnIcon={createpollIcon}
                />
              )}
            </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default HomePage;
