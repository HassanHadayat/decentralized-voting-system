import React, { useState, useRef, useEffect } from 'react';
// import Papa from 'papaparse';
// import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-provincial-election-page.css";
import Web3Converter from '../../../utils/Web3Converter';

function CreateProvincialElection() {
  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  const [province, setProvince] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();

  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleProviceChange = (event) => {
    let value = event.target.value;
    setProvince(value);
  };
  const handleStartDateChange = (event) => {
    let value = event.target.value;
    setStartDate(value);
  };
  const handleStartTimeChange = (event) => {
    let value = event.target.value;
    setStartTime(value);
  };

  const handleEndDateChange = (event) => {
    let value = event.target.value;
    setEndDate(value);
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
    await contracts.initialized[ContractName.ElectionManager].contract.methods
      .createProvincialElection(unixStartTimeStamp, unixEndTimeStamp, Web3Converter.strToBytes32(electionName), Web3Converter.strToBytes3(province))
      .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="create-provincial-election-page-main theme-blue">
        <h2>Create Provincial Election</h2>

        <div className="wp-block-group">
          <div className="create-provincial-election-form contact-form" id="create-provincial-election-form">

            <div className='create-provincial-election-form-row'>
              <p>
                <label htmlFor="create-provincial-election-name">Election Name </label>
                <input id="create-provincial-election-name" type="text" placeholder="Election Name" value={electionName} onChange={handleElectionNameChange} />
              </p>
            </div>
            <div className='create-provincial-election-form-row'>
              <p>
                <label htmlFor="add-candidate-province">Province </label>
                <Form.Select className='dropdown' name="province" id="province" value={province} onChange={handleProviceChange}>
                  <option>Choose</option>
                  <option value="PP-">Punjab</option>
                  <option value="PS-">Sindh</option>
                  <option value="PK-">Khyber Pakhtunkhwa</option>
                  <option value="PB-">Balochistan</option>
                </Form.Select >
              </p>
            </div>
            <div className='create-provincial-election-form-row'>
              <div className='create-provincial-election-time-div'>
                <label htmlFor="create-provincial-election-start">Start On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-provincial-election-start-date" type='date' placeholder=""  onChange={handleStartDateChange}/>
                  <input id="create-provincial-election-start-time" type='time' placeholder=""  onChange={handleStartTimeChange}/>
                </div>
              </div>
            </div>
            <div className='create-provincial-election-form-row'>
              <div className='create-provincial-election-time-div'>
                <label htmlFor="create-provincial-election-end">End On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-provincial-election-end-date" type='date' placeholder=""  onChange={handleEndDateChange}/>
                  <input id="create-provincial-election-end-time" type='time' placeholder=""  onChange={handleEndTimeChange}/>
                </div>
              </div>
            </div>

            <p className='create-provincial-election-form-button'>
              <button className="create-provincial-election-btn" onClick={handleSubmit}>Create</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default CreateProvincialElection;