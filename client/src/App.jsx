import { EthProvider } from "./contexts/EthContext";
import { UserProvider } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {  
  return (
    <EthProvider>
      <UserProvider>
        <Routes>
          <Route>
            {/* <Route path="/" element={<LandingPage />} /> */}
          </Route>
        </Routes>
      </UserProvider>
    </EthProvider>
  );
}

export default App;