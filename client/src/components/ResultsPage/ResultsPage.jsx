import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {useEth, useUserContext} from '../../contexts/contexts'
import Navbar from "../Navbar/Navbar";
import GridSystem from "../GridSystem/GridSystem";
import "./ResultsPage.css";
import "../stylesheet.css";

let PollBtn = (props) => {
  const { setSelectedPollId } = useUserContext();
  const navigate = useNavigate();
  return (
    <Row className="poll-btn" onClick={() => {
      setSelectedPollId(props.id);
      navigate(props.id);
      }}>
      <Col>
        <Row className="poll-btn-name"><span>{props.name}</span></Row>
        <Row className="poll-btn-details">
          <span><div class='box green'>35</div>Casted Vote:</span>
          <span><div class='box yellow'>50</div>Total Vote:</span>
        </Row>
      </Col>
    </Row>
  );
};

function ResultsPage() {
  const { userName, loginStatus } = useUserContext();
  // const {
  //   state: { contract, accounts },
  // } = useEth();
  // const navigate = useNavigate();

  // const [pollsList, setPollsList] = useState([]);
  const [pollsList, setPollsList] = useState([
    { pollId: 0, pollName: "poll-1" },
    { pollId: 1, pollName: "poll-2" },
    { pollId: 2, pollName: "poll-3" },
    { pollId: 3, pollName: "poll-4" },
    { pollId: 4, pollName: "poll-5" },
    { pollId: 5, pollName: "poll-6" },
  ]);
  const [pollsCount, setPollsCount] = useState(0);

  // useEffect(() => {
  //   if (contract && accounts && pollsList.length <= 0) loadPolls();
  // }, [contract, pollsList]);

  const loadPolls = async () => {
    const pCount = await contract.methods
      .pollsCount()
      .call({ from: accounts[0] });
    console.log(pollsCount);
    setPollsCount(pCount);
    // Set Polls Data
    const pollArr = [];
    for (var i = 0; i < pCount; i++) {
      const poll = await contract.methods.polls(i).call({ from: accounts[0] });
      if (poll.isActive == false) {
        pollArr.push({ pollId: poll.id, pollName: poll.name });
      }
    }
    setPollsList(pollArr);
  };

  return (
    <>
    {loginStatus && 
      <div className="resultspage-wrapper">
        {/*---------- NAV-BAR ------------*/}
        <Navbar pageTitle="Results" userName={userName}></Navbar>

        {/*---------- PAGE SITE ------------*/}
        <Container className="polls-container">
        <GridSystem colCount={4} md={6}>

          {pollsList.map((poll) => {
            return (
              <PollBtn key={poll.pollId} id={poll.pollId} name={poll.pollName}></PollBtn>
            );
          })}
          </GridSystem>
        </Container>
      </div>
}
    </>
  );
}

export default ResultsPage;
