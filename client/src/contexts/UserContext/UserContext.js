import { createContext } from "react";

// set the defaults
const UserContext = createContext({
  userName: "",
  setUserName: () => {},
  userCnic: "",
  setUserCnic: () => {},

  loginStatus: null,
  setLoginStatus: () => {},

  //TODO:: DELETE!
  selectedPollId: null,
  setSelectedPollId: () => {},
  
  isAdmin: null,
  setIsAdmin: () => {},
});

export default UserContext;
