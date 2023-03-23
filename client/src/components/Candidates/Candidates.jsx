import React, { useState } from 'react'

function Candidates() {

  const [cnic, setCnic] = useState('');

  const getDetails = async () => {
    const poll = await contract.methods.getElections(cnic).call({ from: accounts[0] });
    console.log(poll);
  }

  const handleChange = (event) => {
    const input = event.target.value;
    setCnic(input);
    getDetails();
  } 
  return (
    <>
    <input type="text"
    className='candidate_Name'
    value={cnic}
    onChange={handleChange}
    />
    
    </>
  )
}

export default Candidates