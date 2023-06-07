import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-constituency-election-page.css";

function CreateConstituencyElection() {
  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");
  const [constituencyNo, setConstituencyNo] = useState("");
  const [constituencyType, setConstituencyType] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();

  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleConstituencyTypeChange = (event) => {
    let value = event.target.value;
    setConstituencyType(value);
  };
  const handleConstituencyNoChange = (event) => {
    let value = event.target.value;
    const regex = /^\d*$/;
    const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
    if ((regex.test(digitsOnly) && digitsOnly.length <= 3) || digitsOnly.length == 0) {
      value = digitsOnly;
      setConstituencyNo(value);
    }
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

    if (constituencyType.startsWith("N")) {
      console.log(constituencyType + constituencyNo);
      console.log(contracts.initialized[ContractName.ElectionManager]);
      await contracts.initialized[ContractName.ElectionManager].contract.methods
        .createNAElection(unixStartTimeStamp, unixEndTimeStamp, Web3Converter.strToBytes32(electionName), Web3Converter.strToBytes8(constituencyType + constituencyNo))
        .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    }
    else if (constituencyType.startsWith("P")) {

      await contracts.initialized[ContractName.ElectionManager].contract.methods
        .createPAElection(unixStartTimeStamp, unixEndTimeStamp, Web3Converter.strToBytes32(electionName), Web3Converter.strToBytes8(constituencyType + constituencyNo))
        .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    }

    //----------------------------- TESTING --------------------------------------------------
    const elections_count = await contracts.initialized[ContractName.ElectionManager].contract.methods
      .elections_count()
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

    for (let i = 0; i < elections_count; i++) {

      const electionAdd = await contracts.initialized[ContractName.ElectionManager].contract.methods
        .elections(i)
        .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

      try {
        try {
          const electionContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
            .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, electionAdd);
          const name = await electionContract.methods.getName().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
          const election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
          console.log(Web3.utils.hexToUtf8(name) + ", " + Web3.utils.hexToUtf8(election_type));
        } catch (err) {
          console.log(err);

          try {
            const electionContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
              .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, electionAdd);
            const name = await electionContract.methods.getName().call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });
            const election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });
            console.log(Web3.utils.hexToUtf8(name) + ", " + Web3.utils.hexToUtf8(election_type));
          } catch (err) {
            console.log(err);
            try {
              const electionContract = new contracts.uninitialized[ContractName.NationalElection].web3.eth
                .Contract(contracts.uninitialized[ContractName.NationalElection].artifact.abi, electionAdd);
              const name = await electionContract.methods.getName().call({ from: contracts.uninitialized[ContractName.NationalElection].accounts[0] });
              const election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.NationalElection].accounts[0] });
              console.log(Web3.utils.hexToUtf8(name) + ", " + Web3.utils.hexToUtf8(election_type));
            } catch (err) { console.log(err); }
          }
        }
      } catch (err) { console.log(err); }

    }



  }

  return (
    <>
      <Header isLanding={false} />

      <main className="create-constituency-election-page-main theme-blue">
        <h2>Create Constituency Election</h2>

        <div className="wp-block-group">
          <div className="create-constituency-election-form contact-form" id="create-constituency-election-form">

            <div className='create-constituency-election-form-row'>
              <p>
                <label htmlFor="create-constituency-election-name">Election Name </label>
                <input id="create-constituency-election-name" type="text" placeholder="Election Name" value={electionName} onChange={handleElectionNameChange} />
              </p>
            </div>
            <div className='create-constituency-election-form-row'>
              <p>
                <label htmlFor="constituency-type">Constituency Type </label>
                <Form.Select className='dropdown' name="constituency-type" id="constituency-type" value={constituencyType} onChange={handleConstituencyTypeChange}>
                  <option>Choose</option>
                  <option value="NA-">NA</option>
                  <option value="PP-">PP</option>
                  <option value="PS-">PS</option>
                  <option value="PK-">PK</option>
                  <option value="PB-">PB</option>
                </Form.Select >
              </p>
              <p>
                <label htmlFor="constituency-no">Constituency No</label>
                <input id="constituency-no" type="text" placeholder="xxx" value={constituencyNo} onChange={handleConstituencyNoChange} />
              </p>
            </div>
            <div className='create-constituency-election-form-row'>
              <div className='create-constituency-election-time-div'>
                <label htmlFor="create-constituency-election-start">Start On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-constituency-election-start-date" type='date' placeholder=""  onChange={handleStartDateChange}/>
                  <input id="create-constituency-election-start-time" type='time' placeholder=""  onChange={handleStartTimeChange}/>
                </div>
              </div>
            </div>
            <div className='create-constituency-election-form-row'>
              <div className='create-constituency-election-time-div'>
                <label htmlFor="create-constituency-election-end">End On </label>
                <div style={{ display: 'flex', columnGap: '15px' }}>
                  <input id="create-constituency-election-end-date" type='date' placeholder=""  onChange={handleEndDateChange}/>
                  <input id="create-constituency-election-end-time" type='time' placeholder=""  onChange={handleEndTimeChange}/>
                </div>
              </div>
            </div>
            <p className='create-constituency-election-form-button'>
              <button className="create-constituency-election-btn" onClick={handleSubmit}>Create</button>
            </p>
          </div>

        </div>
      </main >
    </>
  );
}

export default CreateConstituencyElection;