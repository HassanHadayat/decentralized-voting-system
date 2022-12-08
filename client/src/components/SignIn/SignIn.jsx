import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import useEth from "../../contexts/EthContext/useEth";
import useUserContext from "../../contexts/UserContext/useUserContext";
import "./SignIn.css";

function SignIn(props) {
  const { setUserName, setUserCnic, setLoginStatus } = useUserContext();
  const {
    state: { contract, accounts },
  } = useEth();
  const navigate = useNavigate();

  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  // const handleClick = () => {
  //   setErrorMessage("Example error message!")
  // }

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
  const onSignIn = async () => {
    if (cnic.length <= 0 || password.length <= 0) {
      setErrorMessage("Field empty!");
    } else {
      let validCredentials = await contract.methods
        .signinUser(cnic, password)
        .call({ from: accounts[0] });
      const user = await contract.methods
        .getUser(cnic)
        .call({ from: accounts[0] });
      if (validCredentials) {
        //store the user cnic and set login status TRUE
        setUserName(user.name);
        setUserCnic(cnic);
        setLoginStatus(true);
        navigate("/Home");
      } else {
        setErrorMessage("Account not registered or Invalid credentials!");
      }
    }
  };

  return (
    <div className="signin-page">
      <Col className="signin-panel">
        <Row>
          <h1 className="title">SIGNIN PANEL</h1>
        </Row>
        <Row className="input-field">
          <div>
            <label>CNIC</label>
            <br />
            <input
              type="text"
              placeholder="enter cnic"
              value={cnic}
              onChange={handleCnicChange}
            />
          </div>
        </Row>
        <Row className="input-field">
          <div>
            <label>PASSWORD</label>
            <br />
            <input
              type="password"
              placeholder="enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </Row>
        <Row className="register-link">
          <a href="#" onClick={props.showRegPanel}>
            Register?
          </a>
        </Row>
        <Row className="enter-field">
        {errorMessage && <Row className="error"> {errorMessage} </Row>}
          <button className="enter-btn" onClick={onSignIn}>
            Sign In
          </button>
        </Row>
      </Col>
    </div>
  );
}

export default SignIn;
