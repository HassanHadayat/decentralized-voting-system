import React, { useState } from "react";
import UserContext from "./UserContext";

export default function UserProvider({ children }) {
  const [userName, setUserName] = useState("");
  const [userCnic, setUserCnic] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPollId, setSelectedPollId] = useState();

  const value = {
    userName, setUserName,
    userCnic, setUserCnic,
    loginStatus, setLoginStatus,
    isAdmin, setIsAdmin,
    selectedPollId, setSelectedPollId
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
