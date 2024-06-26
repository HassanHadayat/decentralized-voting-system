import { CookiesProvider } from 'react-cookie';
import { EthProvider } from "./contexts/EthContext";
import { UserProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import {
  LandingPage, SignInPage, RegistrationPage, HomePage
  , ManageVotersPage, AddVoter, AddListOfVoters, RemoveVoter, RemoveListOfVoters
  , ManageCandidatesPage, AddCandidate, AddListOfCandidates, RemoveCandidate, RemoveListOfCandidates
  , ManagePoliticalPartiesPage, AddPoliticalParty, RemovePoliticalParty, ManagePartyCandidates
  , ManageElectionsPage, CreateGeneralElection, CreateProvincialElection, CreateConstituencyElection
  , ElectionsPage, PollingPage
  , ElectionResultsPage, ResultPage
  , PartiesPage
  , CandidatesPage
  , ChangePassword
} from "./pages/pages";
import "./App.css";

function App() {
  return (
    <EthProvider>
      <CookiesProvider>
      <UserProvider>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/home" element={<HomePage />} />

            <Route path="/manage-voters" element={<ManageVotersPage />} />
            <Route path="/manage-voters/add-voter" element={<AddVoter />} />
            <Route path="/manage-voters/add-list-of-voters" element={<AddListOfVoters />} />
            <Route path="/manage-voters/remove-voter" element={<RemoveVoter />} />
            <Route path="/manage-voters/remove-list-of-voters" element={<RemoveListOfVoters />} />

            <Route path="/manage-candidates" element={<ManageCandidatesPage />} />
            <Route path="/manage-candidates/add-candidate" element={<AddCandidate />} />
            <Route path="/manage-candidates/add-list-of-candidates" element={<AddListOfCandidates />} />
            <Route path="/manage-candidates/remove-candidate" element={<RemoveCandidate />} />
            <Route path="/manage-candidates/remove-list-of-candidates" element={<RemoveListOfCandidates />} />

            <Route path="/manage-political-parties" element={<ManagePoliticalPartiesPage />} />
            <Route path="/manage-political-parties/add-political-party" element={<AddPoliticalParty />} />
            {/* <Route path="/manage-political-parties/add-list-of-political-parties" element={<AddListOfPoliticalParties />} /> */}
            <Route path="/manage-political-parties/remove-political-party" element={<RemovePoliticalParty />} />
            <Route path="/manage-political-parties/manage-party-candidates" element={<ManagePartyCandidates />} />

            <Route path="/manage-elections" element={<ManageElectionsPage />}></Route>
            <Route path="/manage-elections/create-general-election" element={<CreateGeneralElection />}></Route>
            <Route path="/manage-elections/create-provincial-election" element={<CreateProvincialElection />}></Route>
            <Route path="/manage-elections/create-constituency-election" element={<CreateConstituencyElection />}></Route>


            <Route path="/elections" element={<ElectionsPage />} />
            <Route path="/elections/polling-page" element={<PollingPage />} />


            <Route path="/election-results" element={<ElectionResultsPage />} />
            <Route path="/election-results/result" element={<ResultPage />} />

            <Route path="/parties" element={<PartiesPage />} />

            <Route path="/candidates" element={<CandidatesPage />} />
            
            <Route path="/change-password" element={<ChangePassword />} />

          </Route>
        </Routes>
      </UserProvider>
      </CookiesProvider>
    </EthProvider>
  );
}

export default App;