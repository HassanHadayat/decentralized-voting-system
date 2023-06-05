import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts'
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/result-page.css";
import Web3 from 'web3';



let GeneralStatContainer = (props) => {
  const { state: contracts, } = useEth();
  const { selectedResult } = useUserContext();
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState("May 29, 2023");
  const [endDate, setEndDate] = useState("May 30, 2023");
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([{
    data: [14, 4]
  },

  ]);
  const [options, setOptions] = useState(
    {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Pakistan Tahreek-e-Insaf', 'Pakistan Muslim League (N)'],
      }
    },
  );




  const loadGeneralResult = async () => {
    const geContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, props.electionAdd);

    // Get Election Name
    setName(Web3.utils.hexToUtf8(await geContract.methods
      .name()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] })));
    // GET Start Date
    // GET End Date

    // Provincial Election Total Votes
    let tempTotalVotes = 0;
    // Provincial Election Casted Votes
    let tempCastedVotes = 0;

    // Get Parties
      







    const constituenciesList = await geContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
    console.log(constituenciesList);
    let tempPartiesAddList = [];
    for (let i = 0; i < constituenciesList.length; i++) {
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, constituenciesList[i]);
      console.log(constContract);

      // Get Total Votes of Constituency and Add
      tempTotalVotes += parseInt(await constContract.methods
        .total_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
      console.log(tempTotalVotes);

      // Get Casted Votes of Constituency and Add
      tempCastedVotes += parseInt(await constContract.methods
        .casted_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
      console.log(tempCastedVotes);

      const newParties = await constContract.methods
        .getParties()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] });
      console.log(newParties);
      for (let j = 0; j < newParties.length; j++) {
        tempPartiesAddList.push(newParties[j]);
      }
    }
    console.log(tempPartiesAddList);

    const partiesAddList = tempPartiesAddList.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    console.log(partiesAddList);

    let partiesNamesList = [];  // Names
    let partiesWonSeatList = [];  // Votes Count
    for (let i = 0; i < partiesAddList.length; i++) {
      const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
        .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, partiesAddList[i]);
      console.log(partyContract);

      const partyName = await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
      partiesNamesList.push(Web3.utils.hexToUtf8(partyName));

      // Get Party Won Seats Count
      const wonSeats = parseInt(await geContract.methods
        .getPartyWinCount(partiesAddList[i])
        .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] }));
        console.log(wonSeats);
      partiesWonSeatList.push(wonSeats);
    }

    // Set Variables
    setTotalVotes(tempTotalVotes);
    setCastedVotes(tempCastedVotes);

    // Setup Chart
    const tempSeries = [{
      data: partiesWonSeatList
    },];
    const tempOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: partiesNamesList,
      }
    };
    setSeries(tempSeries);
    setOptions(tempOptions);
  };
  useEffect(() => {
    loadGeneralResult();
  }, []);

  return (
    <div className="wp-block-group">
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p><b>Election Name: </b>{name}</p>
          <p><b>Start Date & Time: </b>{startDate}</p>
          <p><b>End Date & Time: </b>{endDate}</p>

        </div>
        <div>

          <p><b>Total Votes: </b>{totalVotes}</p>
          <p><b>Votes Casted: </b>{castedVotes}</p>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};


let ProvincialStatContainer = (props) => {
  // props.provincialElectionAdd
  const { state: contracts, } = useEth();
  const { selectedResult } = useUserContext();
  const [name, setName] = useState();
  const [startDate, setStartDate] = useState("May 29, 2023");
  const [endDate, setEndDate] = useState("May 30, 2023");
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([{
    data: [14, 4]
  },

  ]);
  const [options, setOptions] = useState(
    {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Pakistan Tahreek-e-Insaf', 'Pakistan Muslim League (N)'],
      }
    },
  );
  const loadProvincialResult = async () => {
    const peContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, props.electionAdd);

    // Get Election Name
    setName(Web3.utils.hexToUtf8(await peContract.methods
      .name()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] })));
    // GET Start Date
    // GET End Date

    // Provincial Election Total Votes
    let tempTotalVotes = 0;
    // Provincial Election Casted Votes
    let tempCastedVotes = 0;

    // Get Parties
    const constituenciesList = await peContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });
    console.log(constituenciesList);
    let tempPartiesAddList = [];
    for (let i = 0; i < constituenciesList.length; i++) {
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, constituenciesList[i]);
      console.log(constContract);

      // Get Total Votes of Constituency and Add
      tempTotalVotes += parseInt(await constContract.methods
        .total_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
      console.log(tempTotalVotes);

      // Get Casted Votes of Constituency and Add
      tempCastedVotes += parseInt(await constContract.methods
        .casted_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
      console.log(tempCastedVotes);

      const newParties = await constContract.methods
        .getParties()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] });
      console.log(newParties);
      for (let j = 0; j < newParties.length; j++) {
        tempPartiesAddList.push(newParties[j]);
      }
    }
    console.log(tempPartiesAddList);

    const partiesAddList = tempPartiesAddList.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
    console.log(partiesAddList);

    let partiesNamesList = [];  // Names
    let partiesWonSeatList = [];  // Votes Count
    for (let i = 0; i < partiesAddList.length; i++) {
      const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
        .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, partiesAddList[i]);
      console.log(partyContract);

      const partyName = await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
      partiesNamesList.push(Web3.utils.hexToUtf8(partyName));

      // Get Party Won Seats Count
      const wonSeats = parseInt(await peContract.methods
        .getPartyWinCount(partiesAddList[i])
        .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] }));
        console.log(wonSeats);
      partiesWonSeatList.push(wonSeats);
    }

    // Set Variables
    setTotalVotes(tempTotalVotes);
    setCastedVotes(tempCastedVotes);

    // Setup Chart
    const tempSeries = [{
      data: partiesWonSeatList
    },];
    const tempOptions = {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: partiesNamesList,
      }
    };
    setSeries(tempSeries);
    setOptions(tempOptions);
  };
  useEffect(() => {
    loadProvincialResult();
  }, []);

  return (
    <div className="wp-block-group">
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p><b>Election Name: </b>{name}</p>
          <p><b>Start Date & Time: </b>{startDate}</p>
          <p><b>End Date & Time: </b>{endDate}</p>

        </div>
        <div>

          <p><b>Total Votes: </b>{totalVotes}</p>
          <p><b>Votes Casted: </b>{castedVotes}</p>
        </div>
      </div>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};


function ResultPage() {
  const { state: contracts, } = useEth();
  const { selectedResult } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);

  const [statsList, setStatsList] = useState([1]);
  // tempResultsList.push({ result_add: results_add_list[i], name: Web3.utils.hexToUtf8(election_name), date: election_date, isCE: isCE, isPE: isPE, isGE: isGE })

  const [series, setSeries] = useState([{
    data: [14, 4]
  },

  ]);
  const [options, setOptions] = useState(
    {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        categories: ['Pakistan Tahreek-e-Insaf', 'Pakistan Muslim League (N)'],
      }
    },
  );



  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && statsList.length < 1 && !isLoaded)
      loadStats();
  }, [contracts.initialized, statsList]);

  const loadStats = async () => {


  };



  return (
    <>
      <Header isLanding={false} />
      <main className="result-page-main post-611 page type-page status-publish hentry theme-blue">

        {selectedResult.isGE && (
          <>
            <h2>Overall Stats</h2>
            {statsList.map((stat) => {
              return (
                <GeneralStatContainer
                  key={stat}
                  electionAdd={selectedResult.result_add}
                />
              );
            })}
          </>
        )
        }
        {selectedResult.isPE && (
          <>
            <h2>Provincial Stats</h2>
            {statsList.map((stat) => {
              return (
                <ProvincialStatContainer
                  key={stat}
                  electionAdd={selectedResult.result_add}
                />
              );
            })}
          </>
        )
        }
        {/* {selectedResult.isCE && (
          <>
            <h2>Your Constituencies Stats</h2>
            {statsList.map((stat) => {
              return (
                <ProvincialStatContainer />
              );
            })}
          </>
        )
        } */}
      </main>
    </>
  );
}

export default ResultPage;
