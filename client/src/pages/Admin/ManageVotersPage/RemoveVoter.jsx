import React, { useState } from "react";
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";

import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-voter-page.css";

function RemoveVoter() {

  // initializedContracts
  const { state: initializedContracts, } = useEth();

  const [cnic, setCnic] = useState("");
  const [showNotification, setShowNotification] = useState(false);

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
  
  const web3StringToBytes32 = (str) => {
    var result = Web3.utils.asciiToHex(str);
    while (result.length < 66) { result += '0'; }
    if (result.length !== 66) { throw new Error("invalid web3 implicit bytes32"); }
    return result;
  };

  const handleSubmit = async () => {
    if (cnic.length !== 15) {
      alert('Input feilds incorrect!');
    }
    else {
      const cnicBytes32 = web3StringToBytes32(cnic);
      await initializedContracts[ContractName.ECP].contract.methods
        .removeVoterConstituency(cnicBytes32)
        .send({ from: initializedContracts[ContractName.ECP].accounts[0] });
      setShowNotification(true);
      setCnic('');

      // const voters_count = await initializedContracts[ContractName.ECP].contract.methods.voters_count().call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      // var voter_constituency_data = [];
      // for (let i = 0; i < voters_count; i++) {
      //   var voter_cnic = await initializedContracts[ContractName.ECP].contract.methods.voters_cnics(i).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   const voter_index = await initializedContracts[ContractName.ECP].contract.methods.voters_indexes(voter_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   const voter = await initializedContracts[ContractName.ECP].contract.methods.voters(voter_cnic).call({ from: initializedContracts[ContractName.ECP].accounts[0] });
      //   voter_cnic = Web3.utils.hexToUtf8(voter_cnic);
      //   voter_constituency_data = [...voter_constituency_data, { voter_cnic, voter_index, voter }];
      // }
      // console.log(voter_constituency_data);
    }
  };
  return (
    <>
      <Header isLanding={false} />

      <main className="remove-voter-page-main theme-blue">
        {showNotification && <NotificationBox message="Voter removed!" />}
        <h2>REMOVE VOTER</h2>
        <div className="wp-block-group">
          <div className="remove-voter-form contact-form" id="remove-voter-form">
            <p>
              <label htmlFor="remove-voter-cnic">Cnic </label>
              <input id="remove-voter-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
            </p>
            <p>
              <button className="remove-voter-btn" onClick={handleSubmit}>Remove</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default RemoveVoter;
