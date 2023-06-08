import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Web3 from 'web3';
import { useNavigate } from "react-router-dom";
import { Header, NotificationBox } from "../../components/components";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../utils/Web3Converter';
import { otpIcon } from "../../assets/images/images";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/signin-page.css";



function SignInPage() {

  const { state: contracts, } = useEth();
  const { handleLogin } = useUserContext();
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const [cnic, setCnic] = useState("35202-8940855-1");
  const [pass, setPass] = useState("123");
  const [captchaResponse, setCaptchaResponse] = useState("");
  // const [otp, setOTP] = useState(['', '', '', '']);
  // const [enteredOtp, setEnteredOTP] = useState(['', '', '', '']);

  // const generateOTP = (contact) => {
  //   // Generate a random 4-digit OTP
  //   const newOtp = Math.floor(1000 + Math.random() * 900000);
  //   setOTP(newOtp);
  //   // Send the OTP via SMS using Twilio
  //   // client.messages
  //   //   .create({
  //   //     body: `Your OTP is: ${newOtp}`,
  //   //     from: '+923235760204',
  //   //     to: contact,
  //   //   })
  //   //   .then(message => console.log(message.sid))
  //   //   .catch(error => console.log(error));
  // };
  // const handleSendOTP = (contact) => {
  //   // Perform any validation checks on the phone number
  //   // const tempContact = contact;
  //   const tempContact = "+923220988572";
  //   // Generate and send OTP
  //   generateOTP(tempContact);
  // };  
  // const handleOTPChange = (index, value) => {
  //   setEnteredOTP(prevOTP => {
  //     const updatedOTP = [...prevOTP];
  //     updatedOTP[index] = value;
  //     return updatedOTP;
  //   });
  // };

  // const handleVerifyOTP = async () => {
  //   const enteredOTP = otp.join('');
  //   // Call your API function to verify the OTP
  //   try {
  //     const response = await sendOTP(enteredOTP); // Replace with your API function call
  //     // Handle the response based on success or failure
  //     console.log('OTP verification success');
  //   } catch (error) {
  //     console.log('OTP verification failed:', error);
  //   }
  // };

  const handleCaptchaChange = (value) => {
    setCaptchaResponse(value);
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
  const handlePassChange = (event) => {
    let value = event.target.value;
    setPass(value);
  };

  const handleSubmit = async () => {

    // if (captchaResponse === "") {
    //   alert("Please complete the reCAPTCHA challenge.");
    //   return;
    // }


    const voter = {
      cnic: Web3Converter.strToBytes16(cnic),
      password: Web3Converter.strToBytes16(pass)
    }

    const voterAdd = await contracts.initialized[ContractName.VoterManager].contract.methods
      .signinVoter(voter.cnic, voter.password)
      .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
    console.log(voterAdd);
    if (voterAdd == 0x0000000000000000000000000000000000000000) {
      console.log('Invalid Credentials');
    }
    else {
      try {
        const voterContract = new contracts.uninitialized[ContractName.Voter].web3.eth
          .Contract(contracts.uninitialized[ContractName.Voter].artifact.abi, voterAdd);
        const voter = {
          name: Web3.utils.hexToUtf8(await voterContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
          cnic: Web3.utils.hexToUtf8(await voterContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
          contact: Web3.utils.hexToUtf8(await voterContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
        };
        // handleSendOTP(voter.contact);
        handleLogin(voter);
        navigate("/home");
      }
      catch (err) {
        console.log(err);
      }
    }
    handleLogin(voter);
    navigate("/home");
  };

  return (
    <>
      <Header isLanding={true} />

      <main className="signin-page-main theme-blue">
        {showNotification && <NotificationBox message="Signin Failed! Invalid Credentials." />}
        <h2>SIGN IN</h2>
        <div className="wp-block-group">
          <div className="signin-form contact-form" id="signin-form">
            <p>
              <label htmlFor="signin-cnic">Cnic </label>
              <input id="signin-cnic" type="text" placeholder="xxxxx-xxxxxxx-x" value={cnic} onChange={handleCnicChange} />
            </p>
            <p>
              <label htmlFor="signin-password">Password </label>
              <input id="signin-password" type="password" placeholder="Password" value={pass} onChange={handlePassChange} />
            </p>
            <ReCAPTCHA sitekey="6LeEPUMmAAAAAEfSgajqSWhI2xbOS1_FJPuJzwS1" onChange={handleCaptchaChange} />

            <button className="signin-btn" onClick={handleSubmit}>Sign In</button>
          </div>
        </div>


        {/* <div className='container otp-form contact-form'>
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
              <button onClick={handleVerifyOTP}>Verify OTP</button>

            </div>
          </div>
        </div>
       */}
      </main>
    </>
  );
}

export default SignInPage;
