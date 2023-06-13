import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-general-election-page.css";
import Web3Converter from '../../../utils/Web3Converter';

function CreateGeneralElection() {

  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  
  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };
  const handleStartDateChange = (event) => {
    let value = event.target.value;
    setStartDate(value);
    // const startDate = event.target.value;
    // const startTime = document.getElementById("create-general-election-start-time").value;
    // const timestamp = new Date(`${startDate}T${startTime}`).getTime() / 1000;
  };
  const handleStartTimeChange = (event) => {
    let value = event.target.value;
    setStartTime(value);

    // const startDate = event.target.value;
    // const startTime = document.getElementById("create-general-election-start-time").value;
    // const timestamp = new Date(`${startDate}T${startTime}`).getTime() / 1000;
    // setStartTimestamp(timestamp);
  };

  const handleEndDateChange = (event) => {
    let value = event.target.value;
    setEndDate(value);
    // const endDate = event.target.value;
    // const endTime = document.getElementById("create-general-election-end-time").value;
    // const timestamp = new Date(`${endDate}T${endTime}`).getTime() / 1000;
    // setEndTimestamp(timestamp);
  };
  const handleEndTimeChange = (event) => {
    let value = event.target.value;
    setEndTime(value);
  };

  const handleSubmit = async () => {
    const unixStartTimeStamp = new Date(`${startDate}T${startTime}`).getTime() / 1000;
    const unixEndTimeStamp = new Date(`${endDate}T${endTime}`).getTime() / 1000;
    console.log("Unix Start : " , unixStartTimeStamp);
    console.log("Unix End : " , unixEndTimeStamp);
    console.log(contracts.initialized[ContractName.ElectionManager].accounts[0]);
            
    await contracts.initialized[ContractName.ElectionManager].contract.methods
      .createGeneralElection(unixStartTimeStamp, unixEndTimeStamp, Web3Converter.strToBytes32(electionName))
      .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="create-general-election-page-main theme-blue">
        <h2>Create General Election</h2>

        <div className="wp-block-group">
          <div className="create-general-election-form contact-form" id="create-general-election-form">

            <div className='create-general-election-form-row'>
              <p>
                <label htmlFor="create-general-election-name">Election Name </label>
                <input id="create-general-election-name" type="text" placeholder="Election Name" value={electionName} onChange={handleElectionNameChange} />
              </p>
            </div>
            <div className='create-general-election-form-row'>
              <div className='create-general-election-time-div'>
                <label htmlFor="create-general-election-start">Start On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-general-election-start-date" type='date' placeholder="" onChange={handleStartDateChange}/>
                  <input id="create-general-election-start-time" type='time' placeholder="" onChange={handleStartTimeChange}/>
                </div>
              </div>
            </div>
            <div className='create-general-election-form-row'>
              <div className='create-general-election-time-div'>
                <label htmlFor="create-general-election-end">End On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-general-election-end-date" type='date' placeholder="" onChange={handleEndDateChange}/>
                  <input id="create-general-election-end-time" type='time' placeholder="" onChange={handleEndTimeChange}/>
                </div>
              </div>
            </div>

            <p className='create-general-election-form-button'>
              <button className="create-general-election-btn" onClick={handleSubmit}>Create</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default CreateGeneralElection;