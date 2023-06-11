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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (contracts.initialized && !isLoaded)
      loadParties();
  }, [contracts.initialized, isLoaded]);
  const handlePartyChange = (event) => {
    var value = event.target.value;
    setSelectedParty(value);
  }
  const loadParties = async () => {
    const parties_names = await contracts.initialized[ContractName.PartyManager].contract.methods
      .getPartiesNames().call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    for (let i = 0; i < parties_names.length; i++) {
      const name = Web3.utils.hexToUtf8(parties_names[i]);
      console.log(name);
      let tempParties = parties;
      tempParties.push(name);
      const uniqueList = Array.from(new Set(tempParties));

      setParties(uniqueList);
      console.log(parties);
    }
    setIsLoaded(true);
  }
  const handleSubmit = async () => {

    await contracts.initialized[ContractName.PartyManager].contract.methods
      .removeParty(Web3Converter.strToBytes32(selectedParty))
      .send({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });



    // //---------------------------------- TESTING -----------------------------------
    // const parties_count = await contracts.initialized[ContractName.PartyManager].contract.methods
    //   .parties_count()
    //   .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    // console.log(parties_count);

    // for (let i = 0; i < parties_count; i++) {
    //   const partyAdd = await contracts.initialized[ContractName.PartyManager].contract.methods
    //     .parties(i)
    //     .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });

    //   try {
    //     const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
    //       .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, partyAdd);

    //     const party = {
    //       id: await partyContract.methods.id().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
    //       , name: await partyContract.methods.name().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
    //       , alias: Web3.utils.hexToUtf8(await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] }))
    //       , cands_count: await partyContract.methods.candidates_count().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
    //       , constituencies: await partyContract.methods.getConstituencies().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
    //       , party_const: []
    //     };

    //     for (let j = 0; j < party.constituencies.length; j++) {
    //       const party_const = await partyContract.methods.party_constituencies(party.constituencies[j]).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

    //       const candAdd = await partyContract.methods.candidates(party_const.candidate_cnic).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })
    //       const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
    //         .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candAdd);

    //       const cand = {
    //         fullname: Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , age: await candContract.methods.age().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })
    //         , gender: Web3.utils.hexToUtf8(await candContract.methods.gender().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , cnic: Web3.utils.hexToUtf8(await candContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , contact: Web3.utils.hexToUtf8(await candContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , father_name: Web3.utils.hexToUtf8(await candContract.methods.father_name().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , pAdd: Web3.utils.hexToUtf8(await candContract.methods.permanent_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , lAdd: Web3.utils.hexToUtf8(await candContract.methods.local_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , province: Web3.utils.hexToUtf8(await candContract.methods.province().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //         , party: Web3.utils.hexToUtf8(await candContract.methods.party().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
    //       };

    //       party.party_const.push(cand);
    //     }
    //     console.log(party);
    //   }
    //   catch (err) {
    //     console.log(err);
    //   }
    // }

    setParties([]);
    setShowNotification(true);    
    setSelectedParty("");
    setIsLoaded(false);
  }

  return (
    <>
      <Header isLanding={false} />

      <main className="remove-political-party-page-main theme-blue">
        {showNotification && <NotificationBox message="Party removed!" />}
        <h2>REMOVE PARTY</h2>
        <div className="wp-block-group">
          <div className="remove-political-party-form contact-form" id="remove-political-party-form">
            <p>
              <label htmlFor="remove-political-party-party-name">Party </label>
              <Form.Select className='dropdown' name="party-name" id="party-name" value={selectedParty} onChange={handlePartyChange}>
                <option>Choose</option>
                { isLoaded && parties.map((party, index) => (
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