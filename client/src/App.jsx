import { EthProvider } from "./contexts/EthContext";
// import { UserProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import {
  LandingPage, SignInPage, RegistrationPage, HomePage
  , ManageVoterPage, AddVoter, AddListOfVoters, RemoveVoter, RemoveListOfVoters
} from "./pages/pages";
import "./App.css";

function App() {
  return (
    <EthProvider>
      {/* // <UserProvider> */}
      <Routes>
        <Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/manage-voter" element={<ManageVoterPage />} />
          <Route path="/manage-voter/add-voter" element={<AddVoter />} />
          <Route path="/manage-voter/add-list-of-voters" element={<AddListOfVoters />} />
          <Route path="/manage-voter/remove-voter" element={<RemoveVoter />} />
          <Route path="/manage-voter/remove-list-of-voters" element={<RemoveListOfVoters />} />
        </Route>
      </Routes>
      {/* // </UserProvider> */}
    </EthProvider>
  );
}

export default App;