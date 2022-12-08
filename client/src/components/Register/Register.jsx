import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Row, Col} from "react-bootstrap";
import useEth from "../../contexts/EthContext/useEth";
import useUserContext from "../../contexts/UserContext/useUserContext";
import "./Register.css";

function Register(props) {
  const { setUserName, setUserCnic, setLoginStatus } = useUserContext();
  const {state: { contract, accounts }, } = useEth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleCnicChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setCnic(e.target.value);
    }
  };
  const handlePasswordChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setPassword(e.target.value);
    }
  };
  const handleConfPasswordChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setConfPassword(e.target.value);
    }
  };
  const onSignUp = async () => {
    if(password.length === 0 || confPassword.length == 0 || cnic.length === 0 || fullName.length === 0 || 
      confPassword !== password || fullName.length < 4)
    {
      if(password.length === 0 || confPassword.length == 0 || cnic.length === 0 || fullName.length === 0){
        setErrorMessage("Feilds empty!");
      }
      else if(fullName.length < 4){
        setErrorMessage("Name should consist of atleast 4 characters!")
      }
      else if(confPassword !== password){
        setErrorMessage("Passwords didn't matched!")
      }
      setPassword("");
      setConfPassword("");
    }
    else{
      await contract.methods
        .registerUser(fullName, cnic, password)
        .send({ from: accounts[0] });
      
      //store the user cnic and set login status TRUE
      setUserName(fullName);
      setUserCnic(cnic);
      setLoginStatus(true);
      
      navigate("/Home");
    }
  };

  return (
    <div className="reg-page">
      <Col className="reg-panel">
        <Row>
          <h1 className="title">REGISTRATION PANEL</h1>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="fullname">FULL NAME</label>
            <br />
            <input
              type="name"
              name="fullname"
              placeholder="enter full name"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </div>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="cnic">CNIC</label>
            <br />
            <input
              type="text"
              name="cnic"
              placeholder="enter cnic"
              value={cnic}
              onChange={handleCnicChange}
            />
          </div>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="pass">PASSWORD</label>
            <br />
            <input
              type="password"
              name="pass"
              placeholder="enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </Row>
        <Row className="input-field">
          <div>
            <label htmlFor="conf-pass">CONFIRM PASSWORD</label>
            <br />
            <input
              type="password"
              name="conf-pass"
              placeholder="confirm password"
              value={confPassword}
              onChange={handleConfPasswordChange}
            />
          </div>
        </Row>
        <Row className="signin-link">
          <a href="#" onClick={props.showSigninPanel}>
            SignIn?
          </a>
        </Row>
        {errorMessage && <Row className="error"> {errorMessage} </Row>}
        <Row className="enter-field">
          <button className="enter-btn" onClick={onSignUp}>
            Register
          </button>
        </Row>
      </Col>
    </div>
  );
}

export default Register;
