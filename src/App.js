import React from "react"
import LandingPage from "./components/LandingPage"
import HomePage from "./components/HomePage"
import {Routes, Route} from "react-router-dom"
import CreatePoll from "./components/CreatePoll"
function App() {
  return( 
    <>
  <Routes>
      {/* <Route path="/" element = {<CreatePoll/>}/> */}
      <Route path="/" element = {<LandingPage/>}/>
      <Route path="/Home" element = {<HomePage/>}/>
    </Routes>
    </>
  )
}

export default App;