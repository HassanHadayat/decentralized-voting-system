import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from "../../../utils/Web3Converter";

import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-political-party-page.css";

function RemovePoliticalParties() {
  
  const { state: contracts, } = useEth();

  const [parties, setParties] = useState([]);// "Pakistan People's Party"
  const [selectedParty, setSelectedParty] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (contracts.initialized && parties.length == 0)
      loadParties();
  }, [contracts.initialized, parties]);
  const handlePartyChange = (event) => {
    var value = event.target.value;
    setSelectedParty(value);
  }
  const loadParties = async () => {
    const parties_names = await contracts.initialized[ContractName.ECP].contract.methods
      .getPartiesNames().call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
    for (let i = 0; i < parties_names.length; i++) {
      const name = Web3.utils.hexToUtf8(parties_names[i]);
      setParties([...parties, name]);
    }
  }
  const handleSubmit = async () => {

    await contracts.initialized[ContractName.PartyManager].contract.methods
      .removeParty(Web3Converter.strToBytes32(selectedParty))
      .send({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    setShowNotification(true);
    setSelectedParty("");
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="remove-political-party-page-main theme-blue">
        {showNotification && <NotificationBox message="Voter removed!" />}
        <h2>REMOVE VOTER</h2>
        <div className="wp-block-group">
          <div className="remove-political-party-form contact-form" id="remove-political-party-form">
            <p>
              <label htmlFor="remove-political-party-party-name">Party </label>
              <Form.Select className='dropdown' name="party-name" id="party-name" value={selectedParty} onChange={handlePartyChange}>
                <option>Choose</option>
                {parties.map((party, index) => (
                  <option key={index} value={party}>{party}</option>
                ))}
              </Form.Select>
            </p>
            <p>
              <button className="remove-political-party-btn" onClick={handleSubmit}>Remove</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default RemovePoliticalParties;