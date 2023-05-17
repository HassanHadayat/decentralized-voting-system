import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import { ContractName } from "./ContractName";


function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [managersList, setManagersList] = useState(["VoterManager", "ElectionManager", "CandidateManager", "PartyManager"])

  const init = useCallback(async (artifacts) => {

    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();

    // const initializedContracts = {};
    const contracts = { initialized: {}, uninitialized: {} };
    artifacts.forEach((artifact) => {
      const { abi, contractName } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
        contracts.initialized[contractName] = { artifact, web3, accounts, networkID, contract };
        // if(contractName == "ECP"){
        //   console.log(contracts.initialized[ContractName.ECP].artifact.networks[contracts.initialized[ContractName.ECP].networkID].address);
        // }
        // if(managersList.includes(contractName)){
        //   contracts.initialized[contractName].contract.methods.ecp().call({from: contracts.initialized[contractName].accounts[0]})
        //   .then(result => {
        //     console.log(result);
        //   });
        // }
      } catch (err) {
        contracts.uninitialized[contractName] = { artifact, web3, accounts, networkID };
      }
    });

    dispatch({
      type: actions.init,
      data: contracts,
      // data: initializedContracts,
    });
  }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifacts = [
          require("../../contracts/ECP.json"),
          
          require("../../contracts/VoterManager.json"),
          require("../../contracts/Voter.json"),

          require("../../contracts/CandidateManager.json"),
          require("../../contracts/Candidate.json"),

          require("../../contracts/PartyManager.json"),
          
          require("../../contracts/ElectionManager.json"),
          require("../../contracts/GeneralElection.json"),
          require("../../contracts/NationalElection.json"),
          require("../../contracts/ProvincialElection.json"),
          // Add more contract artifacts as needed
        ];
        init(artifacts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const artifacts = [
      require("../../contracts/ECP.json"),
      
      require("../../contracts/VoterManager.json"),
      require("../../contracts/Voter.json"),

      require("../../contracts/CandidateManager.json"),
      require("../../contracts/Candidate.json"),

      require("../../contracts/PartyManager.json"),
      
      require("../../contracts/ElectionManager.json"),
      require("../../contracts/GeneralElection.json"),
      require("../../contracts/NationalElection.json"),
      require("../../contracts/ProvincialElection.json"),
    ];
    const handleChange = () => {
      init(artifacts);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifacts]);


  return (
    <EthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
