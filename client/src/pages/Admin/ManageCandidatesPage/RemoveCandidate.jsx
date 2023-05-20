import React, { useState } from "react";
import Web3 from "web3"
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from "../../../utils/Web3Converter";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/remove-candidate-page.css";

function RemoveCandidate() {

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
      await contracts.initialized[ContractName.CandidateManager].contract.methods
        .removeCandidate(cnicBytes32)
        .send({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });

        
// //------------------------------- TESTING ----------------------------------------------        
//       const cands_count = await contracts.initialized[ContractName.CandidateManager].contract.methods
//       .candidates_count()
//       .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });
//     console.log(cands_count);
    
//     for (let i = 0; i < cands_count; i++) {
//       const candAdd = await contracts.initialized[ContractName.CandidateManager].contract.methods
//         .getCandidate(i)
//         .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });
        
//         console.log(candAdd);

//       try {
//         const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
//           .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candAdd);
//         const cand = {
//           fullname: Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , age: await candContract.methods.age().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })
//           , gender: Web3.utils.hexToUtf8(await candContract.methods.gender().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , cnic: Web3.utils.hexToUtf8(await candContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , contact: Web3.utils.hexToUtf8(await candContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , father_name: Web3.utils.hexToUtf8(await candContract.methods.father_name().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , pAdd: Web3.utils.hexToUtf8(await candContract.methods.permanent_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , lAdd: Web3.utils.hexToUtf8(await candContract.methods.local_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , province: Web3.utils.hexToUtf8(await candContract.methods.province().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//           , party: Web3.utils.hexToUtf8(await candContract.methods.party().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
//         };

//         console.log(cand);
//       }
//       catch (err) {
//         console.log(err);
//       }
//     }

      setShowNotification(true);
      setCnic('');
    }
  };
  return (
    <>
      <Header isLanding={false} />

      <main className="remove-candidate-page-main theme-blue">
        {showNotification && <NotificationBox message="Voter removed!" />}
        <h2>REMOVE CANDIDATE</h2>
        <div className="wp-block-group">
          <div className="remove-candidate-form contact-form" id="remove-candidate-form">
            <p>
              <label htmlFor="remove-candidate-cnic">Cnic </label>
              <input id="remove-candidate-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
            </p>
            <p>
              <button className="remove-candidate-btn" onClick={handleSubmit}>Remove</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default RemoveCandidate;
