import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-na-election-page.css";

function CreateNAElection() {
  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  const [na, setNa] = useState("");


  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleNaChange = (event) => {
    let value = event.target.value;
    const regex = /^\d*$/;
    const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
    if ((regex.test(digitsOnly) && digitsOnly.length <= 3) || digitsOnly.length == 0) {
      value = "NA-" + digitsOnly;
      setNa(value);
    }
  };

  const handleSubmit = async () => {
    await contracts.initialized[ContractName.ElectionManager].contract.methods
      .createProvincialElection(Web3Converter.strToBytes32(electionName), Web3Converter.strToBytes3(province))
      .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="create-na-election-page-main theme-blue">
        <h2>Create Provincial Election</h2>

        <div className="wp-block-group">
          <div className="create-na-election-form contact-form" id="create-na-election-form">

            <div className='create-na-election-form-row'>
              <p>
                <label htmlFor="create-na-election-name">Election Name </label>
                <input id="create-na-election-name" type="text" placeholder="Election Name" value={electionName} onChange={handleElectionNameChange} />
              </p>
            </div>
            <div className='create-na-election-form-row'>
            <p>
              <label htmlFor="add-voter-na">National Assembly Constituency </label>
              <input id="add-voter-na" type="text" placeholder="NA-" value={na} onChange={handleNaChange} />
            </p>
            </div>

            <p className='create-na-election-form-button'>
              <button className="create-na-election-btn" onClick={handleSubmit}>Create</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default CreateNAElection;