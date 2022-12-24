import React, { Component, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../contexts/UserContext/useUserContext";
import useEth from "../../contexts/EthContext/useEth";
import { Col, Container, Row } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import "./ResultPage.css";
import { logo, userIcon } from "../../images/images";

import CanvasJSReact from "../../assets/canvasjs.react";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {
  const options = {
    animationEnabled: true,
    title: {
      text: "RESULT",
    },
    subtitles: [
      {
        // text: "71% Positive",
        verticalAlign: "center",
        fontSize: 24,
        dockInsidePlotArea: true,
      },
    ],
    data: [
      {
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "",
        dataPoints: props.data,
      },
    ],
  };

  return (
    <>
      <CanvasJSChart options={options} />
    </>
  );
};

function ResultPage() {
  const { userName, selectedPollId, loginStatus } = useUserContext();
  const navigate = useNavigate();
  const {
    state: { contract, accounts },
  } = useEth();

  const [poll, setPoll] = useState();
  const [candVotes, setCandVotes] = useState([]);

  // ---------------  FUNCTIONS  --------------------//
  useEffect(() => {
    if(!loginStatus)
      navigate("/");
  },);
  useEffect(() => {
    if (contract && accounts) loadPollResult();
  }, [contract, accounts]);

  const loadPollResult = async () => {
    // set poll details
    const pollDetail = await contract.methods
      .polls(+selectedPollId)
      .call({ from: accounts[0] });
    setPoll(pollDetail);
    console.log(pollDetail);

    // set candidates votes
    const pollCands = await contract.methods
      .getPollCands(pollDetail.id)
      .call({ from: accounts[0] });
    console.log(pollCands);
    const tempCands = [];
    for (let i = 0; i < pollDetail.candidatesCount; i++) {
      let candName = (
        await contract.methods.users(pollCands[i]).call({ from: accounts[0] })
      ).name;
      let candVoteCount = await contract.methods
        .getPollCandVotes(pollDetail.id, pollCands[i])
        .call({ from: accounts[0] });
        tempCands[i] = {name:candName, y:candVoteCount};
    }
    setCandVotes([...tempCands]);
    console.log(tempCands);
  };

  return (
    <>
    {loginStatus && 
      <div className="resultpage-wrapper">
        {/*---------- NAV-BAR ------------*/}
        <Navbar pageTitle={poll?.name} userName={userName}></Navbar>

        {/*---------- PAGE SITE ------------*/}
        {candVotes.length > 0 && (
          <Container className="result-cont">
            <PieChart data={candVotes}></PieChart>
          </Container>
        )}
      </div>
}
    </>
  );
}

export default ResultPage;
