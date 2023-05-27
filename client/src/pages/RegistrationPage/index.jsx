import React, { useState, useRef, useEffect } from 'react';
import { Header } from "../../components/components";
import Web3 from "web3";
import { useEth } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/registration-page.css";

function RegistrationPage() {
  const { state: contracts, } = useEth();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("35202-8940855-1");
  const [contact, setContact] = useState("");
  const [pass, setPass] = useState("123");
  const [confPass, setConfPass] = useState("123");

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

  const handleFullNameChange = (event) => {
    let value = event.target.value;
    setFullName(value);
  };

  const handleAgeChange = (event) => {
    let value = event.target.value;
    setAge(value);
  };

  const handleGenderChange = (event) => {
    let value = event.target.value;
    setGender(value);
  };
  const handleContactChange = (event) => {
    let value = event.target.value;
    setContact(value);
  };
  const handlePassChange = (event) => {
    let value = event.target.value;
    setPass(value);
  };
  const handleConfPassChange = (event) => {
    let value = event.target.value;
    setConfPass(value);
  };

  const handleSubmit = async () => {
    if (pass !== confPass) {
      console.log("Password and Conf Passwrd not matched!!");
      return;
    }
    const voter = {
      fullname: Web3Converter.strToBytes32(fullName),
      age: parseInt(age),
      gender: Web3Converter.strToBytes1(gender),
      cnic: Web3Converter.strToBytes16(cnic),
      contact: Web3Converter.strToBytes12(contact),
      password: Web3Converter.strToBytes16(pass)
    }

    console.log(await contracts.initialized[ContractName.VoterManager].contract.methods
      .registerVoter(voter.fullname, voter.age, voter.gender, voter.cnic, voter.contact, voter.password)
      .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] })
    );

    ////===================== TESTING ============================//
    // const voterConst = await contracts.initialized[ContractName.VoterManager].contract.methods
    // .voters(Web3Converter.strToBytes16("35202-8940855-9"))
    // .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
    // console.log(voterConst);
    // const voterAdd = await contracts.initialized[ContractName.VoterManager].contract.methods
    //   .getRegVoter(voter.cnic, voter.password)
    //   .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
    // console.log(voterAdd);
    // console.log(contracts.uninitialized[ContractName.Voter]);
    // try {
    //   const voterContract = new contracts.uninitialized[ContractName.Voter].web3.eth
    //   .Contract(contracts.uninitialized[ContractName.Voter].artifact.abi, voterAdd);
    //   const name = await voterContract.methods.fullname().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const age = await voterContract.methods.age().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const gender = await voterContract.methods.gender().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const cnic = await voterContract.methods.cnic().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const contact = await voterContract.methods.contact().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const na = await voterContract.methods.na_constituency().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   const pa = await voterContract.methods.pa_constituency().call({from: contracts.uninitialized[ContractName.Voter].accounts[0]});  
    //   console.log(Web3.utils.hexToUtf8(name));
    //   console.log(age);
    //   console.log(Web3.utils.hexToUtf8(gender));
    //   console.log(Web3.utils.hexToUtf8(cnic));
    //   console.log(Web3.utils.hexToUtf8(contact));
    //   console.log(Web3.utils.hexToUtf8(na));
    //   console.log(Web3.utils.hexToUtf8(pa));
    // }
    // catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <>
      <Header isLanding={true} />

      <main className="reg-page-main theme-blue">
        <h2>REGISTRATION</h2>
        <div className="wp-block-group">
          <div className="reg-form contact-form" id="reg-form">
            <p>
              <label htmlFor="reg-fullname">Full Name </label>
              <input id="reg-fullname" type="text" placeholder="Full Name" value={fullName} onChange={handleFullNameChange} />
            </p>
            <div className='reg-form-row'>
              <p>
                <label htmlFor="reg-age">Age </label>
                <input id="reg-age" type="text" placeholder='Age' value={age} onChange={handleAgeChange} />
              </p>
              <p>
                <label htmlFor="reg-gender">Gender </label>
                <input id="reg-gender" type="text" placeholder="M/F" value={gender} onChange={handleGenderChange} />
              </p>
            </div>
            <div className='reg-form-row'>

              <p>
                <label htmlFor="reg-cnic">Cnic </label>
                <input id="reg-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
              </p>
              <p>
                <label htmlFor="reg-contact">Contact </label>
                <input id="reg-contact" type="text" placeholder="03xx-xxxxxxx" value={contact} onChange={handleContactChange} />
              </p>
            </div>
            <div className='reg-form-row'>
              <p>
                <label htmlFor="reg-password">Password </label>
                <input id="reg-password" type="password" placeholder='Password' value={pass} onChange={handlePassChange} />
              </p>
              <p>
                <label htmlFor="reg-conf-password">Confirm Password </label>
                <input id="reg-conf-password" type="password" placeholder='Confirm Password' value={confPass} onChange={handleConfPassChange} />
              </p>
            </div>
            <button className="reg-btn" onClick={handleSubmit}>Register</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default RegistrationPage;
