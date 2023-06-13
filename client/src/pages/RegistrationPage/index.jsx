import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, NotificationBox } from "../../components/components";
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/registration-page.css";
import { otpIcon } from "../../assets/images/images";

function RegistrationPage() {
  const sendOTP=async()=>{
    
  }
  const { state: contracts, } = useEth();
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [cnic, setCnic] = useState("35202-8940855-1");
  const [contact, setContact] = useState("0323-5760204");
  const [pass, setPass] = useState("123");
  const [confPass, setConfPass] = useState("123");

  const [voter, setVoter] = useState();

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '']);
  const [enteredOtp, setEnteredOTP] = useState(['', '', '', '']);


  const generateOTP = (contact) => {
    // Generate a random 4-digit OTP
    const newOtp = Math.floor(1000 + Math.random() * 900000);
    setOTP(newOtp);
    // Send the OTP via SMS using Twilio
    // client.messages
    //   .create({
    //     body: `Your OTP is: ${newOtp}`,
    //     from: '+923235760204',
    //     to: contact,
    //   })
    //   .then(message => console.log(message.sid))
    //   .catch(error => console.log(error));
  };
  const handleSendOTP = (contact) => {
    // Perform any validation checks on the phone number
    // const tempContact = contact;
    const tempContact = "+923220988572";
    // Generate and send OTP
    generateOTP(tempContact);
  };
  const handleOTPChange = (index, value) => {
    setEnteredOTP(prevOTP => {
      const updatedOTP = [...prevOTP];
      updatedOTP[index] = value;
      return updatedOTP;
    });
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join('');
    // Call your API function to verify the OTP
    try {
      const response = await sendOTP(enteredOTP); // Replace with your API function call
      // Handle the response based on success or failure
      console.log('OTP verification success');
    } catch (error) {
      console.log('OTP verification failed:', error);
    }
  };


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
      alert("Password and Conf Passwrd not matched!!");
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
    let canReg = await contracts.initialized[ContractName.VoterManager].contract.methods
      .canRegister(voter.cnic)
      .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
    console.log(canReg);

    if (canReg) {  
      const _isAdmin = await contracts.initialized[ContractName.VoterManager].contract.methods
      .isAdmin(voter.cnic)
      .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
      setIsAdmin(_isAdmin);
      
      setShowNotification(false);
      setVoter(voter);
      // // SHOW OTP
      setShowOTP(true);
    }
    else {
      setNotificationMsg("Registeration Failed! Invalid Credentials.");
      setShowNotification(true);
    }
  };

  const registerVoter = async () => {
    console.log("register Voter()");
    try {
      let regStatus = await contracts.initialized[ContractName.VoterManager].contract.methods
        .registerVoter(voter.fullname, voter.age, voter.gender, voter.cnic, voter.contact, voter.password)
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });

      if (regStatus && voter != null) {
        const tempVoter = {
          name: Web3.utils.hexToUtf8(voter.fullname),
          cnic: Web3.utils.hexToUtf8(voter.cnic),
          contact: Web3.utils.hexToUtf8(voter.contact)
        };
        handleLogin(tempVoter, isAdmin);
        navigate("/home");
      }
      else {
        console.log(regStatus);
        setNotificationMsg("Registration Failed! Try again.")
        setShowNotification(true);
        setShowOTP(false);
        setEnteredOTP(['', '', '', '']);
        setOTP(['', '', '', '']);

        setFullName('');
        setAge();
        setCnic();
        setContact();
        setGender();
        setPass();
        setConfPass();
        setVoter();
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header isLanding={true} />

      <main className="reg-page-main theme-blue">
        <h2>REGISTRATION</h2>
        {showNotification && <NotificationBox message={notificationMsg} variant='danger' />}
        {!showOTP ?
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
          :
          <div className='container otp-form contact-form'>
            <div style={{ alignSelf: 'center' }}>
              <img src={otpIcon} alt="" style={{ width: 'auto', height: '120px' }} />
            </div>
            <div>

              <h2>OTP VERIFICATION</h2>
              <h4>Check your mobile for OTP</h4>
              <div>
                <div className="input-field">
                  <input type="number" value={enteredOtp[0]} onChange={e => handleOTPChange(0, e.target.value)} />
                  <input type="number" value={enteredOtp[1]} onChange={e => handleOTPChange(1, e.target.value)} />
                  <input type="number" value={enteredOtp[2]} onChange={e => handleOTPChange(2, e.target.value)} />
                  <input type="number" value={enteredOtp[3]} onChange={e => handleOTPChange(3, e.target.value)} />
                </div>
                {/* <button onClick={handleVerifyOTP}>Verify OTP</button> */}
                <button className={(enteredOtp[0] != '' && enteredOtp[1] != '' && enteredOtp[2] != '' && enteredOtp[3] != '') ? "active" : ""} onClick={registerVoter}>Verify OTP</button>
              </div>
            </div>
          </div>
        }
      </main>
    </>
  );
}

export default RegistrationPage;
