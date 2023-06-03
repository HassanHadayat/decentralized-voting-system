import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/create-general-election-page.css";
import Web3Converter from '../../../utils/Web3Converter';

function CreateGeneralElection() {

  const { state: contracts, } = useEth();
  const [electionName, setElectionName] = useState("");


  const handleElectionNameChange = (event) => {
    let value = event.target.value;
    setElectionName(value);
  };

  const handleSubmit = async () => {
    await contracts.initialized[ContractName.ElectionManager].contract.methods
      .createGeneralElection(Web3Converter.strToBytes32(electionName))
      .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

    // console.log(  "Contract Size: " +  await contracts.initialized[ContractName.ElectionManager].contract.methods
    // .getCodeSize()
    // .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] }));

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