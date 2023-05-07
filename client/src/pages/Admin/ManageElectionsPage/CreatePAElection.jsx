import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-pa-election-page.css";

function CreatePAElection() {
  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  const [province, setProvince] = useState("");


  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleProviceChange = (event) => {
    let value = event.target.value;
    setProvince(value);
  };

  const handleSubmit = async () => {
    await contracts.initialized[ContractName.ElectionManager].contract.methods
      .createProvincialElection(Web3Converter.strToBytes32(electionName), Web3Converter.strToBytes3(province))
      .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="create-pa-election-page-main theme-blue">
        <h2>Create Provincial Election</h2>

        <div className="wp-block-group">
          <div className="create-pa-election-form contact-form" id="create-pa-election-form">

            <div className='create-pa-election-form-row'>
              <p>
                <label htmlFor="create-pa-election-name">Election Name </label>
                <input id="create-pa-election-name" type="text" placeholder="Election Name" value={electionName} onChange={handleElectionNameChange} />
              </p>
            </div>
            <div className='create-pa-election-form-row'>
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

            <p className='create-pa-election-form-button'>
              <button className="create-pa-election-btn" onClick={handleSubmit}>Create</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default CreatePAElection;