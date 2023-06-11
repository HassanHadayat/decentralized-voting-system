import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from "../../../utils/Web3Converter";

import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/manage-party-candidates-page.css";

function ManagePartyCandidates() {

  const { state: contracts, } = useEth();

  const [cnic, setCnic] = useState("");
  const [constituencyNo, setConstituencyNo] = useState("");
  const [constituencyType, setConstituencyType] = useState("");

  const [parties, setParties] = useState([]);// "Pakistan People's Party"
  const [selectedPartyName, setSelectedPartyName] = useState("");
  const [selectedPartyAdd, setSelectedPartyAdd] = useState("");
  const [selectedPartyIndex, setSelectedPartyIndex] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationMsg, setShowNotificationMsg] = useState("");
  const [showNotificationVariant, setShowNotificationVariant] = useState("success");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCnicChange = (event) => {
    var value = event.target.value;
    var regex;
    var digitsOnly = value.replace(/\D/g, ''); // Remove non-digits

    if (digitsOnly.length > 12) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, 12), '-', digitsOnly.slice(12)].join('');
      regex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    } else if (digitsOnly.length > 5) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, digitsOnly.length)].join('');
      regex = /^[0-9]{5}-[0-9]*$/;
    } else if (digitsOnly.length <= 5) {
      value = digitsOnly.slice(0, digitsOnly.length);
      regex = /^\d+-?\d*$/;
    }
    if ((regex.test(value) && value.length <= 15) || value === "") {
      setCnic(value);
    }
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
  const handlePartyChange = (event) => {
    var index = event.target.value;
    var value = parties[parseInt(index)];
    setSelectedPartyName(value.name);
    setSelectedPartyAdd(value.partyAdd);
    setSelectedPartyIndex(index);
  }
  const loadParties = async () => {
    const parties_add = await contracts.initialized[ContractName.PartyManager].contract.methods
      .getParties().call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    let tempParties = [];
    for (let i = 0; i < parties_add.length; i++) {
      const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
        .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties_add[i]);

      const party = {
        name: Web3.utils.hexToUtf8(await partyContract.methods.name().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
        partyAdd: parties_add[i]
      }
      console.log(party);
      tempParties.push(party);
    }
    console.log(parties);
    setParties(tempParties);

    setIsLoaded(true);
  }

  useEffect(() => {
    if (contracts.initialized && !isLoaded)
      loadParties();
  }, [contracts.initialized, isLoaded]);

  const handleAddSubmit = async () => {
    const candidateAdd = await contracts.initialized[ContractName.CandidateManager].contract.methods
      .candidates(Web3Converter.strToBytes16(cnic))
      .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });

    const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
      .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, selectedPartyAdd);

    await partyContract.methods
      .addCandidate(candidateAdd)
      .send({ from: contracts.uninitialized[ContractName.Party].accounts[0] });


    await partyContract.methods
      .addConstituencyCandidate(Web3Converter.strToBytes16(cnic), Web3Converter.strToBytes8(constituencyType + constituencyNo))
      .send({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

    setParties([]);
    setShowNotificationMsg("Party Candidate Added!");
    setShowNotificationVariant("success");
    setShowNotification(true);
    setSelectedPartyName();
    setSelectedPartyAdd();
    setIsLoaded(false);
  }
  const handleRemoveSubmit = async () => {
    console.log(selectedPartyName, " => ", selectedPartyAdd);

    const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
      .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, selectedPartyAdd);

    console.log(constituencyType + constituencyNo);
    await partyContract.methods
      .removeConstituencyCandidate(Web3Converter.strToBytes8((constituencyType + constituencyNo)))
      .send({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

    await partyContract.methods
      .removeCandidate(Web3Converter.strToBytes16(cnic))
      .send({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

    setParties([]);
    setShowNotificationMsg("Party Candidate Removed!");
    setShowNotificationVariant("success");
    setShowNotification(true);
    setSelectedPartyName();
    setSelectedPartyAdd();
    setIsLoaded(false);
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="manage-party-candidates-page-main theme-blue">
        {showNotification && <NotificationBox message={showNotificationMsg} variant={showNotificationVariant}/>}
        <h2>MANAGE PARTY CANDIDATES</h2>
        <div className="wp-block-group">
          <div className="manage-party-candidates-form contact-form" id="manage-party-candidates-form">
            <div className='manage-party-candidates-form-row'>
              <p>
                <label htmlFor="manage-party-candidates-party-name">Party </label>
                <Form.Select className='dropdown' name="party-name" id="party-name" value={selectedPartyIndex} onChange={handlePartyChange}>
                  <option>Choose</option>
                  {isLoaded && parties.map((party, index) => (
                    <option key={index} value={index}>{party.name}</option>
                  ))}
                </Form.Select>
              </p>
            </div>
            <div className='manage-party-candidates-form-row'>
              <p>
                <label htmlFor="manage-party-candidates-candidate-cnic">Candidate Cnic </label>
                <input id="manage-party-candidates-candidate-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
              </p>
            </div>
            <div className='manage-party-candidates-form-row'>
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
            <div style={{ marginTop: '30px' }} className='manage-party-candidates-form-row'>
              <p>
                <button style={{ width: '100%', backgroundColor: '#2e8b57', borderRadius: '5px' }}
                  className="manage-party-candidates-btn" onClick={handleAddSubmit}>Add</button>
              </p>
              <p>
                <button style={{ width: '100%', backgroundColor: '#FF605C', borderRadius: '5px' }}
                  className="manage-party-candidates-btn" onClick={handleRemoveSubmit}>Remove</button>
              </p>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}

export default ManagePartyCandidates;