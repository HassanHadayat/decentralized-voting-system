import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";

import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-political-party-page.css";

function RemovePoliticalParties() {
  // initializedContracts
  const { state: initializedContracts, } = useEth();

  const [parties, setParties] = useState(["Pakistan Tehreek-e-Insaf", "Pakistan Muslim League (N)"]);// "Pakistan People's Party"
  const [selectedParty, setSelectedParty] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handlePartyChange = (event) => {
    var value = event.target.value;
    setSelectedParty(value);
  }
  const web3StringToBytes32 = (str) => {
    var result = Web3.utils.asciiToHex(str);
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
  };
  const handleSubmit = async () => {

    await initializedContracts[ContractName.ECP].contract.methods
      .removeParty(web3StringToBytes32(selectedParty))
      .send({ from: initializedContracts[ContractName.ECP].accounts[0] });
    setShowNotification(true);
    selectedParty("");
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