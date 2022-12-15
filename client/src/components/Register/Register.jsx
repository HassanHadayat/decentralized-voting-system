import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useEth, useUserContext } from "../../contexts/contexts";
import "./Register.css";

function Register(props) {
  const { setUserName, setUserCnic, setLoginStatus } = useUserContext();
  const {
    state: { contract, accounts },
  } = useEth();
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
  const onRegister = async () => {
    if (
      password.length === 0 ||
      confPassword.length == 0 ||
      cnic.length === 0 ||
      fullName.length === 0 ||
      confPassword !== password ||
      fullName.length < 4
    ) {
      if (
        password.length === 0 ||
        confPassword.length == 0 ||
        cnic.length === 0 ||
        fullName.length === 0
      ) {
        setErrorMessage("Feilds empty!");
      } else if (fullName.length < 4) {
        setErrorMessage("Name should consist of atleast 4 characters!");
      } else if (confPassword !== password) {
        setErrorMessage("Passwords didn't matched!");
      }
      setPassword("");
      setConfPassword("");
    } else {
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
    <div className="register-wrapper align-middle">
      <Container className="register-cont">
        {/* PANEL TITLE */}
        <Row className="mt-4 panel-title">
          <Col>
            <h2>REGISTERATION PANEL</h2>
          </Col>
        </Row>

        {/* PANEL BODY */}
        <Row className="panel-body">
          {/* // FULL NAME */}
          <Row className="mt-5">
            {/* // label */}
            <Row>
              <Col>
                <label>FULL NAME</label>
              </Col>
            </Row>
            {/* // input feild */}
            <Row>
              <Col>
                <input
                  type="text"
                  placeholder="enter full name"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </Col>
            </Row>
          </Row>

          {/* // CNIC */}
          <Row className="mt-5">
            {/* // label */}
            <Row>
              <Col>
                <label>CNIC</label>
              </Col>
            </Row>
            {/* // input feild */}
            <Row>
              <Col>
                <input
                  type="text"
                  placeholder="enter cnic"
                  value={cnic}
                  onChange={handleCnicChange}
                />
              </Col>
            </Row>
          </Row>

          {/* // PASSWORD */}
          <Row className="mt-5">
            {/* // label */}
            <Row>
              <Col>
                <label>PASSWORD</label>
              </Col>
            </Row>
            {/* // input feild */}
            <Row>
              <Col>
                <input
                  type="password"
                  placeholder="enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Col>
            </Row>
          </Row>

          {/* // CONFORM PASSWORD */}
          <Row className="mt-5">
            {/* // label */}
            <Row>
              <Col>
                <label>CONFIRM PASSWORD</label>
              </Col>
            </Row>
            {/* // input feild */}
            <Row>
              <Col>
                <input
                  type="password"
                  placeholder="confirm password"
                  value={confPassword}
                  onChange={handleConfPasswordChange}
                />
              </Col>
            </Row>
          </Row>
        </Row>

        {/* SIGN IN LINK */}
        <Row className="mt-4 mb-5 ml-0 pl-3">
          <a href="#" onClick={props.showSigninPanel}>
            Sign in?
          </a>
        </Row>

        {/* ERROR MESSAGE */}
        {errorMessage && (
          <Row className="ml-0 mb-3 pl-4 error"> {errorMessage} </Row>
        )}
        {/* REGISTER BUTTON */}
        <Row className="mt-auto mb-3">
          <Col>
            <button className="align-middle register-btn" onClick={onRegister}>
              register
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
