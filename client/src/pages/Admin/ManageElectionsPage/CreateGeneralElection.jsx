import React, { useState, useRef, useEffect } from 'react';
// import Papa from 'papaparse';
// import Table from 'react-bootstrap/Table';
// import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-general-election-page.css";

function CreateGeneralElection() {
  // initializedContracts
  const { state: initializedContracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  
  
  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleSubmit = (event) =>{

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