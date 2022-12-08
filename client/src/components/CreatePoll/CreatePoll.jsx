import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import Web3 from "web3";
import useEth from "../../contexts/EthContext/useEth";
import useUserContext from "../../contexts/UserContext/useUserContext";
import Navbar from "../../components/Navbar/Navbar";

import {
  logo,
  userIcon,
  adduserIcon,
  removeuserIcon,
} from "../../images/images";
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

  //-------------------- FUNCTIONS ---------------------------//
  const addToCandList = () => {
    let tempArr = candList;
    tempArr.push(candInputValue);
    setCandList(tempArr);
    setCandInputValue("");
    console.log(candList);
  };
  const addToVoterList = () => {
    let tempArr = voterList;
    tempArr.push(voterInputValue);
    setVoterList(tempArr);
    setVoterInputValue("");
    console.log(voterList);
  };
  const removeFromCandList = (item) => {
    var filtered = candList.filter(function (value, index, arr) {
      return value !== item;
    });
    setCandList(filtered);
  };
  const removeFromVoterList = (item) => {
    var filtered = voterList.filter(function (value, index, arr) {
      return value !== item;
    });
    setVoterList(filtered);
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

  //-------------------- RENDER COMPONENT ---------------------------//
  return (
    <>
    {loginStatus && 
      <div className="createpollpage-wrapper">
        
        {/*---------- NAV-BAR ------------*/}
        <Navbar pageTitle="Create Poll" userName={userName}></Navbar>

        {/*---------- PAGE SITE ------------*/}
        <Container className="createpollpage-cont">
          <Row className="createpollpage-row-pollname">
            <label htmlFor="poll-name">POLL NAME:</label>
            <input
              type="textbox"
              placeholder="enter poll name"
              value={pollName}
              onChange={(e) => {
                setPollName(e.target.value);
              }}
            />
            <button onClick={submitPoll}>Submit</button>
          </Row>
          <Row className="createpollpage-row-pollusers">
            <Col className="createpollpage-col-candbox">
              <Row className="createpollpage-col-title">
                <h2>VOTERS</h2>
              </Row>
              <Row className="cand-input">
                <input
                  type="text"
                  pattern="[0-9-]"
                  placeholder="enter voter cnic"
                  value={voterInputValue}
                  onChange={(e) => {
                    setVoterInputValue(e.target.value);
                  }}
                />
                <button id="add" onClick={addToVoterList}>
                  <img src={adduserIcon} alt="add-user-Icon" />
                </button>
              </Row>
              <Row className="cand-list">
                <ul>
                  {voterList.length > 0 &&
                    voterList.map((item) => (
                      <li type="none" key={item}>
                        <Row className="cand-item">
                          <label>{item}</label>
                          <button
                            id="remove"
                            onClick={() => {
                              removeFromVoterList(item);
                            }}
                          >
                            <img src={removeuserIcon} alt="remove-user-Icon" />
                          </button>
                        </Row>
                      </li>
                    ))}
                </ul>
              </Row>
            </Col>

            <Col className="createpollpage-col-candbox">
              <Row className="createpollpage-col-title">
                <h2>CANDIDATES</h2>
              </Row>
              <Row className="cand-input">
                <input
                  type="text"
                  pattern="[0-9-]"
                  placeholder="enter candidate cnic"
                  value={candInputValue}
                  onChange={(e) => {
                    setCandInputValue(e.target.value);
                  }}
                />
                <button id="add" onClick={addToCandList}>
                  <img src={adduserIcon} alt="add-user-Icon" />
                </button>
              </Row>
              <Row className="cand-list">
                <ul>
                  {candList.length > 0 &&
                    candList.map((item) => (
                      <li type="none" key={item}>
                        <Row className="cand-item">
                          <label htmlFor="">{item}</label>
                          <button
                            id="remove"
                            onClick={() => {
                              removeFromCandList(item);
                            }}
                          >
                            <img src={removeuserIcon} alt="remove-user-Icon" />
                          </button>
                        </Row>
                      </li>
                    ))}
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
}
    </>
  );
}

export default CreatePoll;
