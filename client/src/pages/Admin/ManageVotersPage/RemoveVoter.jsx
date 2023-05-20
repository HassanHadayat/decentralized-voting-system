import React, { useState } from "react";
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from "../../../utils/Web3Converter";

import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-voter-page.css";

function RemoveVoter() {

  // contracts.initialized
  const { state: contracts, } = useEth();

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

  const handleSubmit = async () => {
    if (cnic.length !== 15) {
      alert('Input feilds incorrect!');
    }
    else {
      const cnicBytes32 = Web3Converter.strToBytes16(cnic);
      await contracts.initialized[ContractName.VoterManager].contract.methods
        .removeVoterConstituency(cnicBytes32)
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });

// //------------------------------ TESTING -----------------------------------//
//       const voters_count = await contracts.initialized[ContractName.VoterManager].contract.methods
//         .voters_count()
//         .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
//       console.log(voters_count);
//       for (let i = 0; i < voters_count; i++) {
//         const voter = await contracts.initialized[ContractName.VoterManager].contract.methods
//           .getVoterConstituency(i)
//           .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
//         const VoterString = {
//           cnic: Web3.utils.hexToUtf8(voter.cnic),
//           na: Web3.utils.hexToUtf8(voter.na),
//           pa: Web3.utils.hexToUtf8(voter.pa)
//         };
//         console.log(VoterString);
//       }

      setShowNotification(true);
      setCnic('');

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
