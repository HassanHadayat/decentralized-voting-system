import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userCnic, setUserCnic] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);
  const [selectedPollId, setSelectedPollId] = useState();

  const value = {
    userName, setUserName,
    userCnic, setUserCnic,
    loginStatus, setLoginStatus,
    selectedPollId, setSelectedPollId
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
