import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useEth, useUserContext } from "../../contexts/contexts";
import Navbar from "../Navbar/Navbar";
import GridSystem from "../GridSystem/GridSystem";
import "./ElectionsPage.css";
import "../stylesheet.css";

let PollBtn = (props) => {
  const { setSelectedPollId } = useUserContext();
  const navigate = useNavigate();
  return (
    <Row
      className="poll-btn"
      onClick={() => {
        setSelectedPollId(props.id);
        navigate(props.id);
      }}
    >
      <Col>
        <Row className="poll-btn-name">
          <span>{props.name}</span>
        </Row>
        <Row className="poll-btn-details">
          <span><div >{props.votesCasted}</div>Casted Vote:</span>
          <span>|</span>
          <span><div >{props.totalVotes}</div>Total Vote:</span>
        </Row>
      </Col>
    </Row>
  );
};

function ElectionsPage() {
  const { userName, userCnic, loginStatus, isAdmin } = useUserContext();
  const {
    state: { contract, accounts },
  } = useEth();
  const navigate = useNavigate();

  const [pollsList, setPollsList] = useState([]);
  const [pollsCount, setPollsCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // HANDELING SEARCH QUERY **NEW
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
    // perform search with searchQuery
  }

  const handleInputChange = (event) => {
    const input = event.target.value;
    setSearchQuery(input);
    // fetch suggestions based on input and update the suggestions state
    const poll_names = pollsList.map((poll) => poll.pollName);
    console.log(poll_names);
    setSuggestions(poll_names);
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  }



  useEffect(() => {
    if (!loginStatus) navigate("/");
  });
  useEffect(() => {
    if (contract && accounts && pollsList.length <= 0 && !isLoaded) loadPolls();
  }, [contract, pollsList]);

  const loadPolls = async () => {
    setIsLoaded(true);
    const pCount = await contract.methods
      .pollsCount()
      .call({ from: accounts[0] });
    // console.log(pollsCount);
    setPollsCount(pCount);
    // Set Polls Data
    const pollArr = [];
    for (var i = 0; i < pCount; i++) {
      const poll = await contract.methods.polls(i).call({ from: accounts[0] });
      if (poll.isActive) {
        if (!isAdmin) {
          var hashCnic = await contract.methods
            .hash(userCnic)
            .call({ from: accounts[0] });
          var votersCnic = await contract.methods
            .getPollVotersCnic(poll.id)
            .call({ from: accounts[0] });
          var flag = false;
          console.log(poll);
          for (var j = 0; j < poll.votersCount; j++) {
            console.log(votersCnic[j] + ",  " + hashCnic);

            if (votersCnic[j] == hashCnic) {
              flag = true;
              break;
            }
          }
          if (flag) {
            pollArr.push({
              pollId: poll.id,
              pollName: poll.name,
              votesCasted: poll.votesCount,
              totalVotes: poll.votersCount,
            });
          }
        } else {
          pollArr.push({
            pollId: poll.id,
            pollName: poll.name,
            votesCasted: poll.votesCount,
            totalVotes: poll.votersCount,
          });
        }
      }
    }
    setPollsList(pollArr);
  };

  return (
    <>
      {loginStatus && (
        <div className="electionspage-wrapper">
          {/*---------- NAV-BAR ------------*/}
          <Navbar pageTitle="Elections" userName={userName}></Navbar>

          {/*---------- PAGE SITE ------------*/}
          <Container>
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                // onChange={(event) => setSearchQuery(event.target.value)}
                onChange={handleInputChange}
              />
              
              <Button
                type="submit"
                variant="outline-dark"
                className="searchBtn"
              >
                Search
              </Button>{" "}
            </form>

            
            {suggestions.length > 0 && (
                <ul className="suggestions-list">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}


            <GridSystem colCount={4} md={3}>
              {pollsList.map((poll) => {
                return (
                  <PollBtn
                    key={poll.pollId}
                    id={poll.pollId}
                    name={poll.pollName}
                    votesCasted={poll.votesCasted}
                    totalVotes={poll.totalVotes}
                  ></PollBtn>
                );
              })}
            </GridSystem>
          </Container>
        </div>
      )}
    </>
  );
}

export default ElectionsPage;
