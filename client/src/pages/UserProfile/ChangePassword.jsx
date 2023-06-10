import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import { Header, NotificationBox } from "../../components/components";
import { ContractName } from "../../contexts/EthContext/ContractName";

import "../../assets/styles/stylesheet.css";
import "../../assets/styles/change-password-page.css";
import Web3Converter from "../../utils/Web3Converter";




function ChangePassword() {
  const { state: contracts, } = useEth();
  const { user } = useUserContext();

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");
  const [variant, setVariant] = useState("success");

  const [prevPass, setPrevPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confPass, setConfPass] = useState("");


  const handlePrevPassChange = (event) => {
    let value = event.target.value;
    setPrevPass(value);
  };
  const handleNewPassChange = (event) => {
    let value = event.target.value;
    setNewPass(value);
  };
  const handleConfPassChange = (event) => {
    let value = event.target.value;
    setConfPass(value);
  };

  const handleSave = async () => {
    if (newPass !== confPass) {
      setPrevPass("");
      setNewPass("");
      setConfPass("");
      setNotificationMsg("Password Mismatch!");
      setNotificationMsg("danger");
      setShowNotification(true);
    }
    try {
      const changeStatus = await contracts.initialized[ContractName.VoterManager].contract.methods
        .changePassword(Web3Converter.strToBytes16(user.cnic), Web3Converter.strToBytes16(prevPass), Web3Converter.strToBytes16(newPass))
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
      if (changeStatus) {
        // Show Notification Success
        setNotificationMsg("Password Changed!");
        setVariant("success");
        setShowNotification(true);

        console.log(await contracts.initialized[ContractName.VoterManager].contract.methods
          .getRegVoter(Web3Converter.strToBytes16(user.cnic), Web3Converter.strToBytes16(prevPass))
          .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] }));

        console.log(await contracts.initialized[ContractName.VoterManager].contract.methods
          .getRegVoter(Web3Converter.strToBytes16(user.cnic), Web3Converter.strToBytes16(newPass))
          .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] }));
      }
      else {
        // Show Notification Danger
        setNotificationMsg("Action Failed! Try again.");
        setVariant("danger");
        setShowNotification(true);
      }
      setPrevPass("");
      setNewPass("");
      setConfPass("");
    } catch (error) {
      console.log(error);
      setNotificationMsg("Action Failed! Try again.");
      setVariant("danger");
      setShowNotification(true);
      setPrevPass("");
      setNewPass("");
      setConfPass("");
    }
    // let value = event.target.value;
    // setConfPass(value);
  };
  return (
    <>
      <Header isLanding={false} />

      <main className="change-password-main theme-blue">
        <h2>CHANGE PASSWORD</h2>
        {showNotification && <NotificationBox message={notificationMsg} variant={variant} />}
        <div className="wp-block-group">
          <div className="change-password-form contact-form" id="change-password-form">
            <p>
              <label htmlFor="prev-password">Previous Password </label>
              <input id="prev-password" type="password" placeholder='Previous Password' value={prevPass} onChange={handlePrevPassChange} />
            </p>
            <p>
              <label htmlFor="new-password">New Password </label>
              <input id="new-password" type="password" placeholder='New Password' value={newPass} onChange={handleNewPassChange} />
            </p>
            <p>
              <label htmlFor="conf-password">Confirm Password </label>
              <input id="conf-password" type="password" placeholder='Confirm Password' value={confPass} onChange={handleConfPassChange} />
            </p>

            <button className="save-btn" onClick={handleSave}>Save</button>
          </div>
        </div>

      </main>
    </>
  );
}

export default ChangePassword;