import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../contexts/UserContext/useUserContext";
import useEth from "../../contexts/EthContext/useEth";
import Navbar from "../../components/Navbar/Navbar";
import { Col, Container, Row } from "react-bootstrap";
import GridSystem from '../../components/GridSystem';
import "./ResultsPage.css";
import {logo, userIcon} from "../../images/images";

let Poll = (props) => {
  const { setSelectedPollId } = useUserContext();
  const navigate = useNavigate();
  return (
    <div className="polls-div">
      <button
        className="poll-btn"
        onClick={() => {
          setSelectedPollId(props.pollInfo[0]);
          navigate(props.pollInfo[0]);
        }}
      >
        {props.pollInfo[1]}
      </button>
    </div>
  );
};

function ResultsPage() {
  const { setSelectedPollId, userName, loginStatus } = useUserContext();

  const {
    state: { contract, accounts },
  } = useEth();
  // const navigate = useNavigate();
  const [pollsList, setPollsList] = useState([]);
  const [pollsCount, setPollsCount] = useState(0);

  useEffect(() => {
    if (contract && accounts && pollsList.length <= 0) loadPolls();
  }, [contract, pollsList]);

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
        pollArr.push({ key: poll.id, value: poll.name });
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
              <Poll key={poll.key} pollInfo={[poll.key, poll.value]}></Poll>
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
