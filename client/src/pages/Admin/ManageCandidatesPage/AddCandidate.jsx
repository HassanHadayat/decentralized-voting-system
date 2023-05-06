import React, { useState, useRef, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Web3 from "web3";
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import { Header, NotificationBox } from "../../../components/components";
import Web3Converter from '../../../utils/Web3Converter';
import "../../../assets/styles/stylesheet.css";
import "../../../assets/styles/add-candidate-page.css";


function AddCandidate() {
  // contracts.initialized
  const { state: contracts, } = useEth();

  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("");
  const [contact, setContact] = useState("");
  const [permanentAdd, setPermanentAdd] = useState("");
  const [localAdd, setLocalAdd] = useState("");
  const [province, setProvince] = useState("");
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

  const handleFullNameChange = (event) => {
    let value = event.target.value;
    setFullName(value);
  };

  const handleFatherNameChange = (event) => {
    let value = event.target.value;
    setFatherName(value);
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

  const handlePermanentAddChange = (event) => {
    let value = event.target.value;
    setPermanentAdd(value);
  };

  const handleProviceChange = (event) => {
    let value = event.target.value;
    setProvince(value);
  };
  const handleLocalAddChange = (event) => {
    let value = event.target.value;
    setLocalAdd(value);
  };


  const handleSubmit = async () => {
    if (false) {
      alert('Input feilds incorrect!');
    }
    else {

      const cand = {
        fullname: Web3Converter.strToBytes32(fullName),
        age: parseInt(age),
        gender: Web3Converter.strToBytes1(gender),
        cnic: Web3Converter.strToBytes16(cnic),
        contact: Web3Converter.strToBytes12(contact),
        father_name: Web3Converter.strToBytes32(fatherName),
        permanent_add: Web3Converter.strToBytes32(permanentAdd),
        local_add: Web3Converter.strToBytes32(localAdd),
        province: Web3Converter.strToBytes32(province)
      }
      console.log(cand);
      await contracts.initialized[ContractName.ECP].contract.methods
        .addCandidate(cand.fullname, cand.age, cand.gender, cand.cnic, cand.contact, cand.father_name, cand.permanent_add, cand.local_add, cand.province)
        .send({ from: contracts.initialized[ContractName.ECP].accounts[0] });
        
      setShowNotification(true);
      setFullName('');
      setAge('');
      setGender('');
      setCnic('');
      setContact('');
      setFatherName('');
      setPermanentAdd('');
      setLocalAdd('');
      setProvince('');

      // const voters_count = await contracts.initialized[ContractName.ECP].contract.methods.voters_count().call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
      // var voter_constituency_data = [];
      // for (let i = 0; i < voters_count; i++) {
      //   var voter_cnic = await contracts.initialized[ContractName.ECP].contract.methods.voters_cnics(i).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
      //   const voter_index = await contracts.initialized[ContractName.ECP].contract.methods.voters_indexes(voter_cnic).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
      //   const voter = await contracts.initialized[ContractName.ECP].contract.methods.voters(voter_cnic).call({ from: contracts.initialized[ContractName.ECP].accounts[0] });
      //   voter_cnic = Web3.utils.hexToUtf8(voter_cnic);
      //   voter_constituency_data = [...voter_constituency_data, { voter_cnic, voter_index, voter }];
      // }
      // console.log(voter_constituency_data);
    }
  };


  return (
    <>
      <Header isLanding={false} />

      <main className="add-candidate-page-main theme-blue">
        {showNotification && <NotificationBox message="New Candidate added!" />}
        <h2>ADD CANDIDATE</h2>
        <div className="wp-block-group">
          <div className="add-candidate-form contact-form" id="add-candidate-form">

            <div className='add-candidate-form-row'>
              <p>
                <label htmlFor="add-candidate-fullname">Full Name </label>
                <input id="add-candidate-fullname" type="text" placeholder="Full Name" value={fullName} onChange={handleFullNameChange} />
              </p>
              <p>
                <label htmlFor="add-candidate-fathername">Father Name </label>
                <input id="add-candidate-fathername" type="text" placeholder="Father Name" value={fatherName} onChange={handleFatherNameChange} />
              </p>
            </div>

            <div className='add-candidate-form-row'>
              <div className='add-candidate-form-row'>
                <p>
                  <label htmlFor="add-candidate-age">Age </label>
                  <input id="add-candidate-age" type="text" placeholder="18" value={age} onChange={handleAgeChange} />
                </p>
                <p>
                  <label htmlFor="add-candidate-gender">Gender </label>
                  <input id="add-candidate-gender" type="text" placeholder="M/F" value={gender} onChange={handleGenderChange} />
                </p>
              </div>
              <p>
                <label htmlFor="add-candidate-cnic">Cnic </label>
                <input id="add-candidate-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
              </p>
            </div>

            <div className='add-candidate-form-row'>

              <p>
                <label htmlFor="add-candidate-contact">Contact </label>
                <input id="add-candidate-contact" type="text" placeholder="03xx-xxxxxxx" value={contact} onChange={handleContactChange} />
              </p>
              <p>
                <label htmlFor="add-candidate-province">Province </label>
                <Form.Select className='dropdown' name="province" id="province" value={province} onChange={handleProviceChange}>
                  <option>Choose</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                </Form.Select >
              </p>
            </div>
            <div className='add-candidate-form-row'>

              <p>
                <label htmlFor="add-candidate-permanentAdd">Permanent Address </label>
                <input id="add-candidate-permanentAdd" type="text" placeholder="Permanent Address" value={permanentAdd} onChange={handlePermanentAddChange} />
              </p>
              <p>
                <label htmlFor="add-candidate-localAdd">Local Address </label>
                <input id="add-candidate-localAdd" type="text" placeholder="Local Address" value={localAdd} onChange={handleLocalAddChange} />
              </p>

            </div>

            <p className='add-candidate-form-button'>
              <button className="add-candidate-btn" onClick={handleSubmit}>Add</button>
            </p>
          </div>

        </div>
      </main>
    </>
  );
}

export default AddCandidate;