import React, { useState, useEffect } from "react";
import { Container, Col, Row, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import Navbar from "../Navbar/Navbar";
import { adduserIcon, removeuserIcon } from "../../images/images";
import "./CreatePoll.css";

function CreatePoll() {
  const { userName, loginStatus } = useUserContext();
  const {
    state: { contract, accounts },
  } = useEth();
  const navigate = useNavigate();
  const [pollName, setPollName] = useState("");
  const [candList, setCandList] = useState([]);
  const [candInputValue, setCandInputValue] = useState("");
  const [voterList, setVoterList] = useState([]);
  const [voterInputValue, setVoterInputValue] = useState("");
  
  useEffect(() => {
    if(!loginStatus)
      navigate("/");
  },);
  const addToVoterList = () => {
    let tempArr = voterList;
    tempArr.push(voterInputValue);
    setVoterList(tempArr);
    setVoterInputValue("");
    console.log(voterList);
  };
  const removeFromVoterList = (item) => {
    var filtered = voterList.filter(function (value, index, arr) {
      return value !== item;
    });
    setVoterList(filtered);
  };

  const addToCandList = () => {
    let tempArr = candList;
    tempArr.push(candInputValue);
    setCandList(tempArr);
    setCandInputValue("");
    console.log(candList);
  };
  const removeFromCandList = (item) => {
    var filtered = candList.filter(function (value, index, arr) {
      return value !== item;
    });
    setCandList(filtered);
  };
  const submitPoll = async () => {
    let cands = [];
    for (let i = 0; i < candList.length; i++) {
      cands[i] = Web3.utils.padRight(Web3.utils.asciiToHex(candList[i]), 64);
    }
    let voters = [];
    for (let i = 0; i < voterList.length; i++) {
      voters[i] = Web3.utils.padRight(Web3.utils.asciiToHex(voterList[i]), 64);
    }

    console.log(cands);
    console.log(voters);

    await contract.methods
      .addPoll(pollName, cands.length, cands, voters.length, voters)
      .send({ from: accounts[0] });

    navigate("/Home");
  };

  return (
    <>
      {loginStatus && (
        <div className="createpollpage-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle="Create Poll" userName={userName}></Navbar>

          {/*---------- PAGE SITE ------------*/}
          <Container className="createpollpage-cont">
            <div className="createpollpage-div">
              <Row className="r1">
                <div className="poll-name-row">
                  <Col xs={12}>
                    <div>
                      <label>Poll Name:</label>
                      <input
                        type="text"
                        placeholder="enter poll name"
                        value={pollName}
                        onChange={(e) => {
                          setPollName(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </div>
                <div className="poll-users-row">
                  <Tabs
                    defaultActiveKey="cands-tab"
                    id="cands-voters-tabs"
                    className="mb-3"
                  >
                    <Tab eventKey="cands-tab" title="Candidates">
                      <Col md={12} className="poll-users-tab-col">
                        <Row className="users-input-row p-0">
                          <Col xs={11} className="pl-0">
                            <input
                              type="text"
                              pattern="[0-9-]"
                              placeholder="enter candidate cnic"
                              value={candInputValue}
                              onChange={(e) => {
                                setCandInputValue(e.target.value);
                              }}
                            />
                          </Col>
                          <Col xs={1} className="p-0">
                            <button id="add" onClick={addToCandList}>
                              <img src={adduserIcon} alt="add-user-Icon" />
                            </button>
                          </Col>
                        </Row>
                        <Row className="users-list-row">
                          <ul>
                            {candList.length > 0 &&
                              candList.map((item) => (
                                <li type="none" key={item}>
                                  <Row className="user-item">
                                    <label htmlFor="">{item}</label>
                                    <button
                                      id="remove"
                                      onClick={() => {
                                        removeFromCandList(item);
                                      }}
                                    >
                                      <img
                                        src={removeuserIcon}
                                        alt="remove-user-Icon"
                                      />
                                    </button>
                                  </Row>
                                </li>
                              ))}
                          </ul>
                        </Row>
                      </Col>
                    </Tab>
                    <Tab eventKey="voters-tab" title="Voters">
                      <Col md={12} className="poll-users-tab-col">
                        <Row className="users-input-row p-0">
                          <Col xs={11} className="pl-0">
                            <input
                              type="text"
                              pattern="[0-9-]"
                              placeholder="enter voter cnic"
                              value={voterInputValue}
                              onChange={(e) => {
                                setVoterInputValue(e.target.value);
                              }}
                            />
                          </Col>
                          <Col xs={1} className="p-0">
                            <button id="add" onClick={addToVoterList}>
                              <img src={adduserIcon} alt="add-user-Icon" />
                            </button>
                          </Col>
                        </Row>
                        <Row className="users-list-row">
                          <ul>
                            {voterList.length > 0 &&
                              voterList.map((item) => (
                                <li type="none" key={item}>
                                  <Row className="user-item">
                                    <label>{item}</label>
                                    <button
                                      id="remove"
                                      onClick={() => {
                                        removeFromVoterList(item);
                                      }}
                                    >
                                      <img
                                        src={removeuserIcon}
                                        alt="remove-user-Icon"
                                      />
                                    </button>
                                  </Row>
                                </li>
                              ))}
                          </ul>
                        </Row>
                      </Col>
                    </Tab>
                  </Tabs>
                </div>
              </Row>
              <Row className="r2">
                {/* <Row className="poll-image-row">Poll Image</Row> */}
                <Row className="submit-btn-row m-0">
                  <button onClick={submitPoll}>submit</button>
                </Row>
              </Row>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default CreatePoll;
