import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header, Footer } from "../../components/components";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";



let ElectionResultBtn = (props) => {

  const { handleSelectedResult } = useUserContext();
  const navigate = useNavigate();

  const closedClassName = "accordion-section-header";
  const openClassName = "accordion-section-header open";

  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };
  const handleShowResult = (isOverall, isProvincial, isYourConst) => {
    let newSelected = { result_add: props.result.result_add, isYourConst: isYourConst, isProvincial: isProvincial, isOverall: isOverall }
    handleSelectedResult(newSelected);
    navigate("/election-results/result");
  }
  // tempResultsList.push({ result_add: results_add_list[i], name: Web3.utils.hexToUtf8(election_name), date: election_date, isCE: isCE, isPE: isPE, isGE: isGE })

  return (
    <div className="wp-block-ctcl-election-website-accordion-section-block accordion-section-wrapper">

      <h2 className={props.isOpen ? openClassName : closedClassName}>
        <span onClick={handleOpenChange}>{props.result.name}</span>
      </h2>
      <section className="accordion-section-content">
        <h3 className="wp-block-heading">{props.result.date}</h3>
        {props.result.isCE && <p>
          <a style={{ color: 'Highlight', textDecoration: 'underline' }} target="_blank" rel="noreferrer noopener"
            onClick={() => handleShowResult(false, false, true)}>Stats of your Constituencies Result</a>
        </p>}
        {(props.result.isPE && !props.result.isGE) && <p>
          <a style={{ color: 'Highlight', textDecoration: 'underline' }} target="_blank" rel="noreferrer noopener"
            onClick={() => handleShowResult(false, true, false)}>Stats of Overall Result</a>
        </p>}
        {(props.result.isGE && props.result.isPE) && <p>
          <a style={{ color: 'Highlight', textDecoration: 'underline' }} target="_blank" rel="noreferrer noopener"
            onClick={() => handleShowResult(true, false, false)}>Stats of Overall Result</a>
        </p>}
      </section>
    </div>
  );
};


function ElectionResultsPage() {
  const { state: contracts, } = useEth();
  const { user } = useUserContext();

  const [resultsList, setResultsList] = useState([
    // { result_add: , name: , date: , isCE:, isPE:, isGE: })
  ]
  );
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
      loadResults();
  }, [currTimestamp]);

  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && resultsList.length < 1 && !isLoaded)
      loadResults();
  }, [contracts.initialized, resultsList]);

  const loadResults = async () => {

    // const elections_count = await contracts.initialized[ContractName.ElectionManager].contract
    //   .methods.elections_count()
    //   .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

    // if (elections_count > 0) {
    //   await contracts.initialized[ContractName.ElectionManager].contract
    //     .methods.endElection(0)
    //     .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // }

    // console.log(
    //   await contracts.initialized[ContractName.ElectionManager].contract
    //     .methods.results_count()
    //     .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] })
    // )
    // let na_prompt = prompt("Enter NA: ");
    // let pa_prompt = prompt("Enter PA: ");
    if (!user) return;
    let na_prompt = user.na;
    let pa_prompt = user.pa;

    setIsLoaded(true);
    // Getting Results(Election) Contract Addresses
    const results_add_list = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.getResults(currTimestamp)
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

    // const results_count = await contracts.initialized[ContractName.ElectionManager].contract
    //   .methods.results_count()
    //   .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // for (let i = 0; i < results_count; i++) {
    //   results_add_list.push(
    //     await contracts.initialized[ContractName.ElectionManager].contract
    //       .methods.results(i)
    //       .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] })
    //   )
    // }
    console.log(results_add_list);

    // const prevResultsList = [...resultsList]
    let tempResultsList = [];
    for (let i = 0; i < results_add_list.length; i++) {
      let electionContract = Web3.utils.asciiToHex("");
      let election_type = Web3.utils.asciiToHex("");
      electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
        .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, results_add_list[i]);
      election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.Election].accounts[0] });

      // try {
      //   console.log("NATIONAL AREA");
      //   // General Election Type
      //   electionContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
      //     .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, results_add_list[i]);
      //   election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });

      // } catch (err) {
      //   console.log(err);

      //   try {
      //     // Provincial Election Type && Provincial Constituency Election Type
      //     electionContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      //       .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, results_add_list[i]);
      //     election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

      //   } catch (err) {
      //     console.log(err);

      //     try {
      //       // National Election Type && National Constituency Election Type
      //       electionContract = new contracts.uninitialized[ContractName.NationalElection].web3.eth
      //         .Contract(contracts.uninitialized[ContractName.NationalElection].artifact.abi, results_add_list[i]);
      //       election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.NationalElection].accounts[0] });
      //     } catch (err) { console.log(err); }
      //   }
      // }

      // Checking Election Type
      election_type = Web3.utils.hexToUtf8(election_type);
      let isCE = false, isPE = false, isGE = false;

      if (election_type == "General Election") {
        isCE = isPE = isGE = true;
      }
      else if (election_type == "Provincial Election") {
        isCE = isPE = true;
      }
      else if (election_type == "National Constituency Election" || election_type == "Provincial Constituency Election") {
        isCE = true;
      }

      // Getting Election Name
      let election_name = await electionContract.methods.name().call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });

      // Getting Election Date
      const election_date = "Oct 14, 2023";


      // Pushing to results list
      tempResultsList.push({
        result_add: results_add_list[i],
        name: Web3.utils.hexToUtf8(election_name),
        date: election_date,
        isCE: isCE, isPE: isPE, isGE: isGE
      })

    }

    // if (prevResultsList.length > 1) {
    //   console.log("prevResultsList => ", prevResultsList);
    //   console.log("tempResultsList => ", tempResultsList);
    //   console.log("Results List => ", prevResultsList.filter(item1 =>
    //     tempResultsList.some(item2 => item2.result_add == prevResultsList.result_add)
    //   ));
    //   setResultsList(prevResultsList.filter(item1 =>
    //     tempResultsList.some(item2 => item2.result_add == prevResultsList.result_add)
    //   ));
    // }
    // else {
    //   setResultsList(tempResultsList);
    // }
    setResultsList(tempResultsList);

    // setResultsList(tempResultsList.filter((item, index) => {
    //   const firstIndex = tempResultsList.findIndex((el) => el.result_add === item.result_add);
    //   return index === firstIndex;
    // }));
  };

  const [openIndex, setOpenIndex] = useState(null);
  const handleOpenChange = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <>
      <Header />
      <main className="election-results-page-main post-425 page type-page status-publish hentry">
        <h1>Election Results</h1>
        <p>You can find results on elections from 2005 to the present.</p>
        <section className="wp-block-ctcl-election-website-accordion-group-block accordion-group">
          {resultsList.map((result, index) => {
            const isOpen = index === openIndex;
            return (
              <ElectionResultBtn
                key={result.name}
                result={result}
                // resultName={result.name}
                // resultDate={result.date}
                // resultIsCE={result.isCE}
                // resultIsPE={result.isPE}
                // resultIsGE={result.isGE}
                isOpen={isOpen}
                setOpen={() => handleOpenChange(index)}
              ></ElectionResultBtn>
            );
          })}
        </section>
        <p />
      </main>
    </>
  );
}

export default ElectionResultsPage;
