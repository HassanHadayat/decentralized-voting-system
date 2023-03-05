import { EthProvider } from "./contexts/EthContext";
import { UserProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import { LandingPage, HomePage, ElectionsPage, ResultsPage, CreatePoll, PollPage, ResultPage, UserProfile} from "./components/pages";
import "./App.css";

function App() {  
  return (
    <EthProvider>
      <UserProvider>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Elections" element={<ElectionsPage />} />
            <Route path="/Results" element={<ResultsPage />} />
            <Route path="/CreatePoll" element={<CreatePoll />} />
            <Route path="/Elections/:id" element={<PollPage />} />
            <Route path="/Results/:id" element={<ResultPage />} />
            <Route path="/UserProfile" element={<UserProfile />} />
          </Route>
        </Routes>
      </UserProvider>
    </EthProvider>
  );
}

export default App;