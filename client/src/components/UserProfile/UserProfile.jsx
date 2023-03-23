import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { useEth, useUserContext } from "../../contexts/contexts";
import Navbar from "../Navbar/Navbar";
import "./UserProfile.css";

function UserProfile() {
  const {
    userName,
    setUserName,
    userCnic,
    setUserCnic,
    loginStatus,
    setLoginStatus,
  } = useUserContext();
  const {
    state: { contract, accounts },
  } = useEth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleCurrPasswordChange = (e) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setCurrPassword(e.target.value);
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
  const onUpdate = async () => {
    if (
      password.length === 0 ||
      confPassword.length == 0 ||
      currPassword.length === 0 ||
      fullName.length === 0 ||
      confPassword !== password ||
      fullName.length < 4
    ) {
      if (
        password.length === 0 ||
        confPassword.length == 0 ||
        currPassword.length === 0 ||
        fullName.length === 0
      ) {
        setErrorMessage("Feilds empty!");
      } else if (fullName.length < 4) {
        setErrorMessage("Name should consist of atleast 4 characters!");
      } else if (confPassword !== password) {
        setErrorMessage("Passwords didn't matched!");
      }
      setCurrPassword("");
      setPassword("");
      setConfPassword("");
    } else {
      console.log(fullName, userCnic, currPassword, password);
      await contract.methods
        .updateUserPass(fullName, userCnic, currPassword, password)
        .send({ from: accounts[0] });

      //store the user cnic and set login status TRUE
      setUserName(fullName);
      setUserCnic(userCnic);
      setLoginStatus(true);

      navigate("/Home");
    }
  };

  useEffect(() => {
    if (!loginStatus) navigate("/");
  });

  return (
    <>
      {loginStatus && (
        <div className="userprofile-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle="UserProfile" userName={userName}></Navbar>

          {/* PAGE SITE */}
          <Container className="userprofile-cont">
            <div className="userprofile-div align-middle">
              <Container className="mb-5 userprofile-panel-cont">
                {/* PANEL TITLE */}
                <Row className="mt-4 panel-title">
                  <Col>
                    <h2>ACCOUNT SETTINGS</h2>
                  </Col>
                </Row>

                {/* PANEL BODY */}
                <Row className="panel-body">
                  {/* // FULL NAME */}
                  <Row className="mt-4">
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

                  {/* // CURRENT PASSWORD */}
                  <Row className="mt-4">
                    {/* // label */}
                    <Row>
                      <Col>
                        <label>CURRENT PASSWORD</label>
                      </Col>
                    </Row>
                    {/* // input feild */}
                    <Row>
                      <Col>
                        <input
                          type="password"
                          placeholder="enter current password"
                          value={currPassword}
                          onChange={handleCurrPasswordChange}
                        />
                      </Col>
                    </Row>
                  </Row>

                  {/* // PASSWORD */}
                  <Row className="mt-4">
                    {/* // label */}
                    <Row>
                      <Col>
                        <label>NEW PASSWORD</label>
                      </Col>
                    </Row>
                    {/* // input feild */}
                    <Row>
                      <Col>
                        <input
                          type="password"
                          placeholder="enter new password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </Col>
                    </Row>
                  </Row>

                  {/* // CONFORM PASSWORD */}
                  <Row className="mt-4">
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

                {/* ERROR MESSAGE */}
                {errorMessage && (
                  <Row className="ml-0 mb-3 pl-4 error"> {errorMessage} </Row>
                )}
                {/* REGISTER BUTTON */}
                <Row className="mt-auto mb-3">
                  <Col>
                    <button
                      className="align-middle landing-btns updateprofile-btn"
                      onClick={onUpdate}
                    >
                      update
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
export default UserProfile;
