import { EthProvider } from "./contexts/EthContext";
import { UserProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HomePage from "./components/HomePage/HomePage";
import ElectionsPage from "./components/ElectionsPage/ElectionsPage";
import ResultsPage from "./components/ResultsPage/ResultsPage";
import CreatePoll from "./components/CreatePoll/CreatePoll";
import PollPage from "./components/PollPage/PollPage";
import ResultPage from "./components/ResultPage/ResultPage";
import Test from "./components/index.jsx";
import "./App.css";

function App() {
  
  return (
    // <Routes>
    //   <Route>
    //   <Route path="/" element={<Test />} />
    //   </Route>
    // </Routes>

    <EthProvider>
      <UserProvider>
        <Routes>
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/Elections" element={<ElectionsPage />} />
            <Route path="/Results" element={<ResultsPage />} />
            <Route path="/CreatePoll" element={<CreatePoll />} />
            <Route path="/Elections/:id" element={<PollPage />} />
            <Route path="/Results/:id" element={<ResultPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </EthProvider>
  );
}

export default App;
