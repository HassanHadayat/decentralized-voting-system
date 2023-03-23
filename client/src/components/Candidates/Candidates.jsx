import React, { useState, useEffect } from 'react'
import { useEth, useUserContext } from "../../contexts/contexts";
import "./Candidates.css";
import { Col, Row, Button } from "react-bootstrap";
import GridSystem from "../GridSystem/GridSystem";
import { useNavigate } from "react-router-dom";

function Candidates() {
  
  let PollBtn = (props) => {
    const { setSelectedPollId } = useUserContext();
    const navigate = useNavigate();
    return (
        <div className="elec_result">
          <span>Election Name: {props.electionName}</span>
          <span style={{border: "1px solid black"}}></span>
          <span>Votes Year: {props.year}</span>
          <span style={{border: "1px solid black"}}></span>
          <span>Election Result: {props.result}</span>
        </div>
 
    );
  };
 

  const {state: { contract, accounts },} = useEth();
  const [cnic, setCnic] = useState('');
  const [pollDetail, setPollDetail] = useState([]);
  

  const getDetails = async () => {
    const poll = await contract.methods.getElections(cnic).call({ from: accounts[0] });
    setPollDetail(poll);
  }

  const handleChange = (event) => {
    const input = event.target.value;
    setCnic(input);
  } 
  return (
    <>
    <div className='searchBox'>
    <input type="text"
    className='search-bar'
    placeholder='Enter Candidate CNIC...'
    value={cnic}
    onChange={handleChange}
    />
    <Button className='searchBtnCand' variant="outline-dark" type='submit' onClick={getDetails}>SUBMIT</Button>
    </div>
    <GridSystem colCount={1} lg={5}>
    {pollDetail.map((poll) => {
                return (
                  <PollBtn
                    key = {poll.electionName}
                    electionName={poll.electionName}
                    year={poll.year}
                    result={poll.result}
                  ></PollBtn>
                );
              })}
              </GridSystem>
    </>
  )
}

export default Candidates