import React, { useState } from "react";
import Web3 from "web3";
import pako from "pako";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from "../../../utils/Web3Converter";
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-voter-page.css";

function AddVoter() {
  // initializedContracts
  const { state: contracts, } = useEth();

  const [cnic, setCnic] = useState("");
  const [na, setNa] = useState("");
  const [pa, setPa] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleCnicChange = (event) => {
    var value = event.target.value;
    var regex;
    var digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
    // let str = "1234567890123";
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

  const handleNaChange = (event) => {
    let value = event.target.value;
    const regex = /^\d*$/;
    const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
    if ((regex.test(digitsOnly) && digitsOnly.length <= 3) || digitsOnly.length == 0) {
      value = "NA-" + digitsOnly;
      setNa(value);
    }
  };

  const handlePaChange = (event) => {
    let value = event.target.value;
    const regex = /^\d*$/;
    const char_regix = /^[PSKB]$/i;
    const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
    if ((regex.test(digitsOnly) && digitsOnly.length <= 3) || digitsOnly.length == 0) {
      if (value.length <= 1) value = "P";
      else if (value.length == 2 && !char_regix.test(value[1].toUpperCase())) value = value[0];
      else if (value.length > 2) value = "P" + value[1] + "-" + digitsOnly;
      setPa(value.toUpperCase());
    }
  };

  const handleSubmit = async () => {
    if (cnic.length !== 15 || na.length < 4 && pa.length < 4) {
      alert('Input feilds incorrect!');
    }
    else {
      const voter = {
        cnic: Web3Converter.strToBytes16(cnic),
        na: Web3Converter.strToBytes8(na),
        pa: Web3Converter.strToBytes8(pa)
      }

      await contracts.initialized[ContractName.VoterManager].contract.methods
        .addVoterConstituency(voter)
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
      setShowNotification(true);
      setCnic('');
      setNa('');
      setPa('');
    }
  };

  return (
    <>
      <Header isLanding={false} />

      <main className="add-voter-page-main theme-blue">
        {showNotification && <NotificationBox message="New voter added!" />}
        <h2>ADD VOTER</h2>
        <div className="wp-block-group">
          <div className="add-voter-form contact-form" id="add-voter-form">
            <p>
              <label htmlFor="add-voter-cnic">Cnic </label>
              <input id="add-voter-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
            </p>
            <p>
              <label htmlFor="add-voter-na">National Assembly Constituency </label>
              <input id="add-voter-na" type="text" placeholder="NA-" value={na} onChange={handleNaChange} />
            </p>
            <p>
              <label htmlFor="add-voter-pa">Provincial Assembly Constituency </label>
              <input id="add-voter-pa" type="text" placeholder="PA-" value={pa} onChange={handlePaChange} />
            </p>
            <p>
              <button className="add-voter-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddVoter;
