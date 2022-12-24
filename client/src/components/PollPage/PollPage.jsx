import React, { Component, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import Navbar from "../Navbar/Navbar";
import "./PollPage.css";

function PollPage() {
  const { userName, loginStatus } = useUserContext();
  const navigate = useNavigate();
  const { id: selectedPollId } = useParams();
  const {
    state: { contract, accounts },
  } = useEth();
  const { userCnic } = useUserContext();
  const [poll, setPoll] = useState({});
  const [candidates, setCandidates] = useState([]);
  const [voter, setVoter] = useState();

  useEffect(() => {
    if(!loginStatus)
      navigate("/");
  },);
  useEffect(() => {
    if (contract && accounts) loadPollDetails();
  }, [contract, accounts]);

  const loadPollDetails = async () => {
    // set poll details
    const pollDetail = await contract.methods
      .polls(+selectedPollId)
      .call({ from: accounts[0] });
    setPoll(pollDetail);
    console.log(pollDetail);
    // set poll candidates
    const pollCands = await contract.methods
      .getPollCands(pollDetail.id)
      .call({ from: accounts[0] });
    const tempCands = [];
    for (let i = 0; i < pollDetail.candidatesCount; i++) {
      tempCands[i] = await contract.methods
        .users(pollCands[i])
        .call({ from: accounts[0] });
    }
    setCandidates([...tempCands]);
    setVoter(
      await contract.methods.getUser(userCnic).call({ from: accounts[0] })
    );
  };

  const submitVote = async () => {
    // Check CNIC of checked candidate
    var checkedCand;
    var checkboxes = document.getElementsByName("vote-check");
    checkboxes.forEach((item) => {
      if (item.checked === true) checkedCand = item.value;
    });
    console.log(checkedCand);
    console.log(+selectedPollId);
    // Caste Vote
    await contract.methods
      .castVote(voter.cnic, checkedCand, +selectedPollId)
      .send({ from: accounts[0] });

    // TODO:: DELETE!!
    const vote = await contract.methods
      .getVote(+selectedPollId)
      .call({ from: accounts[0] });

    console.log(
      "voter: " +
        (await vote.voterCnic) +
        " VOTE[" +
        (await vote.voteId) +
        "]CASTED! to " +
        "candidate: " +
        (await vote.candCnic)
    );

    navigate("/Home");
  };

  let CandItem = (props) => {
    const onlyOne = (event) => {
      var checkboxes = document.getElementsByName(event.target.name);
      checkboxes.forEach((item) => {
        if (item.value !== event.target.value) item.checked = false;
      });
    };
    return (
      <Col className="cand-item">
        <div>
          <h3>{props.candInfo.name}</h3>
          {/* <h3>CNIC: {props.candInfo.cnic}</h3> */}
        </div>
        <input
          type="checkbox"
          value={props.candInfo.cnic}
          name="vote-check"
          onClick={(e) => {
            onlyOne(e);
          }}
        />
      </Col>
    );
  };

  return (
    <>
      {loginStatus && (
        <div className="pollpage-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle={poll?.name} userName={userName}></Navbar>

          {/*---------- PAGE SITE ------------*/}
          <Container>
            <Container className="canditems-cont">
              <Row className="canditems-cont-title">
                <h2>POLL</h2>
              </Row>
              <Row className="cand-list">
                <ul>
                  {candidates.length > 0 &&
                    candidates.map((cand) => (
                      <li type="none" key={cand.cnic}>
                        <CandItem
                          key={cand.cnic}
                          candInfo={{ cnic: cand.cnic, name: cand.name }}
                        ></CandItem>
                      </li>
                    ))}
                </ul>
              </Row>
              <Row>
                <button onClick={submitVote}>submit</button>
              </Row>
            </Container>
          </Container>
        </div>
      )}
    </>
  );
}

export default PollPage;
