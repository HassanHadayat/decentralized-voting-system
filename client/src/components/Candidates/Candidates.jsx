import React, { useState, useEffect } from 'react'
import { useEth, useUserContext } from "../../contexts/contexts";
import "./Candidates.css";
import {Button } from "react-bootstrap";

function Candidates() {
  
 

  const {state: { contract, accounts },} = useEth();
  const [cnic, setCnic] = useState('');
  const [pollDetail, setPollDetail] = useState();
  
  // useEffect(() => {
  //   getDetails();
  // }, [cnic]);


  const getDetails = async () => {
    const poll = await contract.methods.getElections(cnic).call({ from: accounts[0] });
    // console.log(poll);
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
    value={cnic}
    onChange={handleChange}
    />
    <Button className='searchBtn' variant="outline-dark" type='submit' onClick={getDetails}>SUBMIT</Button>
    </div>



    {pollDetail}
    </>
  )
}

export default Candidates