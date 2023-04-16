import React, { useReducer, useCallback, useEffect} from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const init = useCallback(async (artifacts) => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.requestAccounts();
    const networkID = await web3.eth.net.getId();

    const initializedContracts = {};
    artifacts.forEach((artifact) => {
      const { abi, contractName } = artifact;
      let address, contract;
      try {
        address = artifact.networks[networkID].address;
        contract = new web3.eth.Contract(abi, address);
      } catch (err) {
        console.error(err);
      }
      initializedContracts[contractName] = { artifact, web3, accounts, networkID, contract };
    });
  
    dispatch({
      type: actions.init,
      data: initializedContracts,
    });
  }, []);
  
  useEffect(() => {
    const tryInit = async () => {
      try {
        const artifacts = [
          // require("../../contracts/Helper.json"),
          require("../../contracts/ECP.json"),
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
      // require("../../contracts/Helper.json"),
      require("../../contracts/ECP.json"),
      // Add more contract artifacts as needed
    ];
    const handleChange = () => {
      init(artifacts);
    };

    events.forEach((e) => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach((e) => window.ethereum.removeListener(e, handleChange));
    };
  }, [init]);
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
