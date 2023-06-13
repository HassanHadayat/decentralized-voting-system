import React, { useReducer, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";
import { ContractName } from "./ContractName";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [managersList, setManagersList] = useState([
    "VoterManager",
    "ElectionManager",
    "CandidateManager",
    "PartyManager",
  ]);
  const [web3, setWeb3] = useState(null);

  const init = useCallback(async (artifacts) => {
    if (!web3) return;
    try {
      let accounts = await web3.eth.getAccounts();
      accounts=[accounts[0],];
      const networkID = await web3.eth.net.getId();
      // console.log(accounts_temp[0]);
      // console.log(accounts);
      // console.log(networkID);

      const contracts = { initialized: {}, uninitialized: {} };
      artifacts.forEach((artifact) => {
        const { abi, contractName } = artifact;
        let address, contract;
        try {
          address = artifact.networks[networkID].address;
          contract = new web3.eth.Contract(abi, address);
          contracts.initialized[contractName] = {
            artifact,
            web3,
            accounts,
            networkID,
            contract,
          };
          // console.log(address);
          // console.log(contract)
        } catch (err) {
          console.log(contractName);
          contracts.uninitialized[contractName] = {
            artifact,
            web3,
            accounts,
            networkID,
          };
        }
      });
      // console.log(contracts);
      dispatch({
        type: actions.init,
        data: contracts,
      });
    } catch (err) {
      console.log(err);
    }
  }, [web3]);

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
          require("../../contracts/Party.json"),
          require("../../contracts/ElectionManager.json"),
          require("../../contracts/Election.json"),
          require("../../contracts/GeneralElection.json"),
          require("../../contracts/NationalElection.json"),
          require("../../contracts/ProvincialElection.json"),
          require("../../contracts/Constituency.json"),
        ];
        init(artifacts);
      } catch (err) {
        // console.error(err);
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
      require("../../contracts/Party.json"),
      require("../../contracts/ElectionManager.json"),
      require("../../contracts/Election.json"),
      require("../../contracts/GeneralElection.json"),
      require("../../contracts/NationalElection.json"),
      require("../../contracts/ProvincialElection.json"),
      require("../../contracts/Constituency.json"),
    ];
    const handleChange = () => {
      init(artifacts);
    };

    if (web3 && web3.ethereum) {
      events.forEach((e) => web3.ethereum.on(e, handleChange));
      return () => {
        events.forEach((e) => web3.ethereum.removeListener(e, handleChange));
      };
    }
  }, [init, state.artifacts, web3]);

  useEffect(() => {
    const initializeWeb3 = () => {
      const provider = Web3.givenProvider || "ws://localhost:8545";
      const newWeb3 = new Web3(provider);
      setWeb3(newWeb3);
    };

    initializeWeb3();
  }, []);
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
