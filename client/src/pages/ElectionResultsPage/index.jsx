import React, { useState, useRef, useEffect } from 'react';
import Web3 from "web3";
import { useEth } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header, Footer } from "../../components/components";
import Web3Converter from '../../utils/Web3Converter';
import "../../assets/styles/stylesheet.css";



let ElectionResultBtn = (props) => {
  const closedClassName = "accordion-section-header";
  const openClassName = "accordion-section-header open";
  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };

  return (
    <div className="wp-block-ctcl-election-website-accordion-section-block accordion-section-wrapper">

      <h2 className={props.isOpen ? openClassName : closedClassName}>
        <span onClick={handleOpenChange}>{props.resultName}</span>
      </h2>
      <section className="accordion-section-content">
        <h3 className="wp-block-heading">{props.resultDate}</h3>
        {props.resultIsCE && <p>
          <a href="/election-results/result" target="_blank" rel="noreferrer noopener">Stats of your Constituencies Result</a>
        </p>}
        {props.resultIsPE && <p>
          <a href="/election-results/result" target="_blank" rel="noreferrer noopener">Stats of Provicial Election Results</a>
        </p>}
        {props.resultIsGE && <p>
          <a href="/election-results/result" target="_blank" rel="noreferrer noopener">Stats of Overall Result</a>
        </p>}
      </section>
    </div>
  );
};


function ElectionResultsPage() {
  const { state: contracts, } = useEth();

  const [resultsList, setResultsList] = useState([
    // { result_add: , name: "General Elections 2023", date: "Oct 14, 2023", isCE: true, isPE: true, isGE: true },
    { name: "Provincial Elections 2023", date: "April 14, 2023", isCE: true, isPE: true, isGE: false },
    { name: "Constituency Election 2023", date: "June 28, 2023", isCE: true, isPE: false, isGE: false }]
  );
  const [isLoaded, setIsLoaded] = useState(false);



  // const [electionsList, setElectionsList] = useState([
  //   // { name: "General Elections 2023", constituency: "NA-1" },
  //   // { name: "General Elections 2023", constituency: "PP-1" },
  //   // { name: "Provincial Elections 2023", constituency: "PS-59" },
  //   // { name: "Constituency Election 2023", constituency: "NA-127" }
  // ]);


  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && resultsList.length < 1 && !isLoaded)
      loadResults();
  }, [contracts.initialized, resultsList]);

  const loadResults = async () => {
    // let na_prompt = prompt("Enter NA: ");
    // let pa_prompt = prompt("Enter PA: ");
    let na_prompt = "NA-1";
    let pa_prompt = "PP-1";

    setIsLoaded(true);
    // Getting Results(Election) Contract Addresses
    const results_add_list = [];
    const results_count = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.results_count()
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    for (let i = 0; i < results_count; i++) {
      results_add_list.push(
        await contracts.initialized[ContractName.ElectionManager].contract
          .methods.results(i)
          .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] })
      )
    }


    for (let i = 0; i < results_add_list.length; i++) {
      let electionContract;
      let election_type;

      try {
        // General Election Type
        electionContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
          .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, results_add_list[i]);
        election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });

      } catch (error) {
        console.log(err);

        try {
          // Provincial Election Type && Provincial Constituency Election Type
          electionContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
            .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, results_add_list[i]);
          election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

        } catch (err) {
          console.log(err);

          try {
            // National Election Type && National Constituency Election Type
            electionContract = new contracts.uninitialized[ContractName.NationalElection].web3.eth
              .Contract(contracts.uninitialized[ContractName.NationalElection].artifact.abi, results_add_list[i]);
            election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.NationalElection].accounts[0] });
          } catch (err) { console.log(err); }
        }
      }

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
      election_name = await electionContract.methods.name().call({ from: contracts.uninitialized[ContractName.ElectionManager].accounts[0] });

      // Getting Election Date
      const election_date = "Oct 14, 2023";
      

      // Pushing to results list
      let tempResultsList = [...resultsList];
      tempResultsList.push({ result_add: results_add_list[i], name: election_name, date: election_data, isCE: isCE, isPE: isPE, isGE: isGE })
      setResultsList(tempResultsList);
    }
    // const na_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
    //   .methods.getElectionConstituency(Web3Converter.strToBytes8(na_prompt))
    //   .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // console.log(na_electionsList);
    // const pa_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
    //   .methods.getElectionConstituency(Web3Converter.strToBytes8(pa_prompt))
    //   .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // // const pa_electionsList = [];
    // console.log(pa_electionsList);

    // const newElectionsList = [...electionsList];
    // for (let i = 0; i < na_electionsList.election_names.length; i++) {
    //   newElectionsList.push({ name: Web3.utils.hexToUtf8(na_electionsList.election_names[i]), constituency: na_prompt, constituencyAdd: na_electionsList.const_adds[i] });
    // }
    // for (let i = 0; i < pa_electionsList.election_names.length; i++) {
    //   newElectionsList.push({ name: Web3.utils.hexToUtf8(pa_electionsList.election_names[i]), constituency: pa_prompt, constituencyAdd: pa_electionsList.const_adds[i] });
    // }
    setResultsList(newElectionsList);
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
                resultName={result.name}
                resultDate={result.date}
                resultIsCE={result.isCE}
                resultIsPE={result.isPE}
                resultIsGE={result.isGE}
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
