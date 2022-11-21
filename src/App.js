import React from "react"
import LandingPage from "./components/LandingPage"
import HomePage from "./components/HomePage"
import ElectionsPage from "./components/ElectionsPage"
import {Routes, Route} from "react-router-dom"
import CreatePoll from "./components/CreatePoll"
function App() {
  return( 
    <>
  <Routes>
      {/* <Route path="/" element = {<CreatePoll/>}/> */}
      <Route path="/" element = {<LandingPage/>}/>
      <Route path="/Home" element = {<HomePage/>}/>
      <Route path="/Elections" element = {<ElectionsPage/>}/>
    </Routes>
    </>
  )
}

export default App;