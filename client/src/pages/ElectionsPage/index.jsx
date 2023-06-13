import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header, Footer } from "../../components/components";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/elections-page.css";



let ElectionBtn = (props) => {
  const { handleSelectedPoll } = useUserContext();
  const navigate = useNavigate();

  const handlePollClicked = (poll) => {
    handleSelectedPoll(poll)
    navigate("/elections/polling-page");
  };

  return (
    <a className="tile" onClick={() => { handlePollClicked({ electionName: props.electionName, electionAdd: props.electionAdd, pollName: props.electionConstituency, constituencyAdd: props.constituencyAdd }) }}>
      <label>{props.electionConstituency}</label>
      <img decoding="async" width={50} height={50} alt=""
        src="data:image/svg+xml,%3Csvg%20width=%2251%22%20height=%2250%22%20viewBox=%220%200%2051%2050%22%20fill=%22none%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M9.417%208.971v-.333l-.2-.267-2.623-3.499.27-1.624h28.222a4%204%200%20014%204v40.1H9.416V8.971z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M17.505%2042.586l-3.33-3.362%201.344-1.354%201.986%201.998%204.923-4.966%201.344%201.355-6.267%206.329z%22%20fill=%22%23004CB3%22/%3E%3Cpath%20d=%22M9.39%206.643v8.051H2.6v-8.05a3.395%203.395%200%20116.79%200z%22%20fill=%22%23D7D8E0%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20fill=%22%23004CB3%22%20d=%22M25.691%2038.744h8.637v1.921h-8.637zm-11.516-8.643h20.153v1.921H14.175zm0-4.803h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175zm0-4.802h20.153v1.921H14.175z%22/%3E%3Cpath%20fill=%22%2355D5F1%22%20stroke=%22%23192754%22%20stroke-width=%222%22%20d=%22M44.925%2010.932h4.718v25.852h-4.718z%22/%3E%3Cpath%20d=%22M44.925%2036.863h4.718v4.42l-2.36%203.035-2.358-3.036v-4.42z%22%20fill=%22%23fff%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3Cpath%20d=%22M49.642%208.488v3.325h-4.717V8.488a2.359%202.359%200%20014.718%200z%22%20fill=%22%23EE5C4A%22%20stroke=%22%23192754%22%20stroke-width=%222%22/%3E%3C/svg%3E"
      />
      <label>{props.electionName}</label>
    </a>
  );
};


function ElectionsPage() {
  const { state: contracts, } = useEth();
  const { user } = useUserContext();
  const [electionsList, setElectionsList] = useState([
    // { name: "General Elections 2023", constituency: "NA-1" },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [currTimestamp, setCurrTimestamp] = useState(0);
  useEffect(() => {
    setCurrTimestamp(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      const _currentTimestamp = Math.floor(Date.now() / 1000);
      console.log("Setting Curr Time: ", _currentTimestamp);
      setCurrTimestamp(_currentTimestamp);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts)
      loadElections();
  }, [currTimestamp]);

  useEffect(() => {
    // console.log(electionsList);
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && electionsList.length < 1 && !isLoaded)
      loadElections();
  }, [contracts.initialized, electionsList]);

  const loadElections = async () => {
    // let na_prompt = prompt("Enter NA: ");
    // let pa_prompt = prompt("Enter PA: ");
    if (!user) return;
    let na_prompt = user.na;
    let pa_prompt = user.pa;
    console.log("Curr Time: ", currTimestamp);
    setIsLoaded(true);
    const na_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.getElectionConstituency(Web3Converter.strToBytes8(na_prompt), currTimestamp)
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    console.log(na_electionsList);
    const pa_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.getElectionConstituency(Web3Converter.strToBytes8(pa_prompt), currTimestamp)
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // const pa_electionsList = [];
    console.log(pa_electionsList);

    // const prevElectionsList = [...electionsList]
    let newElectionsList = [];
    for (let i = 0; i < na_electionsList.election_names.length; i++) {
      newElectionsList.push({ name: Web3.utils.hexToUtf8(na_electionsList.election_names[i]), electionAdd: na_electionsList.election_adds[i], constituency: na_prompt, constituencyAdd: na_electionsList.const_adds[i] });
    }
    for (let i = 0; i < pa_electionsList.election_names.length; i++) {
      newElectionsList.push({ name: Web3.utils.hexToUtf8(pa_electionsList.election_names[i]), electionAdd: pa_electionsList.election_adds[i], constituency: pa_prompt, constituencyAdd: pa_electionsList.const_adds[i] });
    }
    setElectionsList(newElectionsList);
  };


  return (
    <>
      <Header isLanding={false} />
      <main className="elections-page-main post-611 page type-page status-publish hentry theme-blue">

        <h2>ELECTIONS</h2>
        {electionsList.length > 0 ?
          <div className="wp-block-group wp-block-ctcl-election-website-tile-nav-section-block tile-wrapper">
            {electionsList.map((election) => {
              return (
                <ElectionBtn
                  key={election.name + election.constituency}
                  electionName={election.name}
                  electionAdd={election.electionAdd}
                  electionConstituency={election.constituency}
                  constituencyAdd={election.constituencyAdd}
                ></ElectionBtn>
              );
            })}
          </div>
          :
          <div className="wp-block-group">
            <h1 style={{ fontWeight: 'normal' }}>Currently no elections being held...</h1>
          </div>
        }
      </main>
    </>
  );
}

export default ElectionsPage;
