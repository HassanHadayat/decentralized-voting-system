import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEth, useUserContext } from "../../contexts/contexts";
import { Container, Row, Col } from "react-bootstrap";
import { userIcon } from "../../images/images";
import "./SignIn.css";

function SignIn(props) {
  const { setUserName, setUserCnic, setLoginStatus, setIsAdmin } = useUserContext();
  const { state: { contract, accounts }, } = useEth();
  const navigate = useNavigate();

  const [cnic, setCnic] = useState("");
  const [pass, setPass] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleCnicChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setCnic(e.target.value);
    }
  };
  const handlePassChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setPass(e.target.value);
    }
  };
  const onSignIn = async () => {
    if (cnic.length <= 0 || pass.length <= 0) {
      setErrMsg("Field empty!");
    } else {
      let validCredentials = await contract.methods
        .signinUser(cnic, pass)
        .call({ from: accounts[0] });
      const user = await contract.methods
        .getUser(cnic)
        .call({ from: accounts[0] });
      if (validCredentials) {
        //store the user cnic and set login status TRUE
        setUserName(user.name);
        setUserCnic(cnic);
        setLoginStatus(true);
        if(user.name == "admin" && cnic =="000" && pass == "000"){
          setIsAdmin(true);
        }
        navigate("/Home");
      } else {
        setErrMsg("Account not registered or Invalid credentials!");
      }
    }
  };

  return (
    <div className="signin-wrapper align-middle">
      <Container className="signin-cont">
        {/* PANEL TITLE */}
        <Row className="mt-4 panel-title">
          <Col>
            <h2>SIGNIN PANEL</h2>
          </Col>
        </Row>

        {/* USER LOGO */}
        <Row className="mt-5 user-logo">
          <img src={userIcon} alt="user logo" />
        </Row>

        {/* PANEL TITLE */}
        <Row className="panel-body">
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
                  value={pass}
                  onChange={handlePassChange}
                />
              </Col>
            </Row>
          </Row>
        </Row>

        {/* REGISTERATION LINK */}
        <Row className="mt-4 mb-5 ml-0 pl-3">
          <a href="#" onClick={props.showRegPanel}>
            Register?
          </a>
        </Row>

        {/* ERROR MESSAGE */}
        {errMsg && <Row className="ml-0 mb-3 pl-4 error"> {errMsg} </Row>}
        {/* SIGNIN BUTTON */}
        <Row className="mt-auto mb-3">
          <Col>
            <button className="align-middle landing-btns signin-btn" onClick={onSignIn}>
              sign in
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default SignIn;
