import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/components";
import { useEth } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css"; import "../../assets/styles/signin-page.css";

function SignInPage() {
  const { state: contracts, } = useEth();
  const navigate = useNavigate();

  const [cnic, setCnic] = useState("");
  const [pass, setPass] = useState("");


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
  const handlePassChange = (event) => {
    let value = event.target.value;
    setPass(value);
  };

  const handleSubmit = async () => {
    const voter = {
      cnic: Web3Converter.strToBytes16(cnic),
      password: Web3Converter.strToBytes16(pass)
    }

    const canLogin = await contracts.initialized[ContractName.VoterManager].contract.methods
      .signinVoter(voter.cnic, voter.password)
      .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });

    console.log(canLogin);
    if (canLogin) {
      navigate("/home");
    }
  };

  return (
    <>
      <Header isLanding={true} />

      <main className="signin-page-main theme-blue">
        <h2>SIGN IN</h2>
        <div className="wp-block-group">
          <div className="signin-form contact-form" id="signin-form">
            <p>
              <label htmlFor="signin-cnic">Cnic </label>
              <input id="signin-cnic" type="text" placeholder="00000-0000000-0" value={cnic} onChange={handleCnicChange} />
            </p>
            <p>
              <label htmlFor="signin-password">Password </label>
              <input id="signin-password" type="password" value={pass} onChange={handlePassChange} />
            </p>
            <button className="signin-btn" onClick={handleSubmit}>Sign In</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignInPage;
