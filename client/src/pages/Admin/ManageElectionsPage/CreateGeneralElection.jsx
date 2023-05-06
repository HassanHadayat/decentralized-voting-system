import React, { useState, useRef, useEffect } from 'react';
// import Papa from 'papaparse';
// import Table from 'react-bootstrap/Table';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-general-election-page.css";

function CreateGeneralElection() {
  // initializedContracts
  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");


  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const web3StringToBytes32 = (str) => {
    var result = Web3.utils.asciiToHex(str);
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
  };

  const handleSubmit = async () => {
    // await contracts.initialized[ContractName.ECP].contract.methods
    //   .createGeneralElection(web3StringToBytes32(electionName))
    //   .send({ from: contracts.initialized[ContractName.ECP].accounts[0] });


    const electionAdd = await contracts.initialized[ContractName.ECP].contract.methods
      .elections(0)
      .call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
    console.log(electionAdd);
    // const { abi } = require("../../../contracts/GeneralElection.json");
    
    // const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    
    // console.log(contracts.uninitialized);
    try {
      const electionContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, electionAdd);
      const name = await electionContract.methods.getName().call({from: contracts.uninitialized[ContractName.GeneralElection].accounts[0]});  
      console.log(Web3.utils.hexToUtf8(name));
    }
    catch (err) {
      console.log(err);
    }
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