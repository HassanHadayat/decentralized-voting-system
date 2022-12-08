// import React, { Component, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useUserContext from "../../contexts/UserContext/useUserContext";
// import useEth from "../../contexts/EthContext/useEth";
// import { Col, Container, Row } from "react-bootstrap";
// import Navbar from "../Navbar/Navbar";
// import "./UserProfilePage.css";
// import { logo, userIcon } from "../../images/images";

// function UserProfilePage() {
//   const { userName, loginStatus } = useUserContext();
//   const navigate = useNavigate();
//   const {
//     state: { contract, accounts },
//   } = useEth();

//   const [cnic, setCnic] = useState("");
//   const [currPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleCnicChange = (e) => {
//     if (/^\d+$|^$/.test(e.target.value)) {
//       setCnic(e.target.value);
//     }
//   };
//   const handleNewPasswordChange = (e) => {
//     if (/^\d+$|^$/.test(e.target.value)) {
//       setNewPassword(e.target.value);
//     }
//   };
//   const handleCurrentPasswordChange = (e) => {
//     if (/^\d+$|^$/.test(e.target.value)) {
//       setCurrentPassword(e.target.value);
//     }
//   };


//   const onSave = async () => {
//     if(currPassword.length === 0 || newPassword.length == 0 || cnic.length === 0 || 
//       newPassword !== currPassword)
//     {
//       if(currPassword.length === 0 || newPassword.length == 0 || cnic.length === 0){
//         setErrorMessage("Feilds empty!");
//       }
//       else if(newPassword !== currPassword){
//         setErrorMessage("Passwords didn't matched!")
//       }
//       setCurrentPassword("");
//       setNewPassword("");
//     }
//     else{
//       console.log(cnic, currPassword, newPassword)
//       await contract.methods
//         .updateUserPass(cnic, currPassword, newPassword)
//         .send({ from: accounts[0] });
      
//       //store the user cnic and set login status TRUE
//       // setUserCnic(cnic);
//       // setCurrentPassword("")
//       // setNewPassword("")
      
//       navigate("/Home");
//     }
//   };



  
//   return (
//     <>
//       {/* {loginStatus && ( */}
//         <div className="userprofilepage-wrapper">
//           {/*---------- NAV-BAR ------------*/}
//           <Navbar pageTitle="UserProfile" userName={userName}></Navbar>

          
          
          
//           {/* PAGE SITE */}
//           <div className="userprofilepage-div">
//           <Container>
//             <Row className="input-field">
//               <div>
//                 <label htmlFor="cnic">CNIC</label>
//                 <br />
//                 <input
//                   type="text"
//                   name="cnic"
//                   placeholder="enter cnic"
//                   value={cnic}
//                   onChange={handleCnicChange}
//                 />
//               </div>
//             </Row>
//             <Row className="input-field">
//               <div>
//                 <label htmlFor="curr-pass">CURRENT PASSWORD</label>
//                 <br />
//                 <input
//                   type="password"
//                   name="curr-pass"
//                   placeholder="enter current password"
//                   value={currPassword}
//                   onChange={handleCurrentPasswordChange}
//                 />
//               </div>
//             </Row>
//             <Row className="input-field">
//               <div>
//                 <label htmlFor="new-pass">NEW PASSWORD</label>
//                 <br />
//                 <input
//                   type="password"
//                   name="new-pass"
//                   placeholder="enter new password"
//                   value={newPassword}
//                   onChange={handleNewPasswordChange}
//                 />
//               </div>
//             </Row>

//         {errorMessage && <Row className="error"> {errorMessage} </Row>}

//             <Row className="enter-field">

//           <button className="enter-btn" onClick={onSave}>
//             Save
//           </button>
//         </Row>
//           </Container>
//           </div>
//         </div>
//       {/* )} */}
//     </>
//   );
// }

// export default UserProfilePage;
