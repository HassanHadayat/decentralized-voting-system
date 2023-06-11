import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts'
import { useEth, useUserContext } from "../../contexts/contexts";
import { ContractName } from "../../contexts/EthContext/ContractName";
import { Header } from "../../components/components";
import "../../assets/styles/stylesheet.css";
import "../../assets/styles/result-page.css";
import Web3 from 'web3';
import Web3Converter from '../../utils/Web3Converter';



let GeneralStatContainer = (props) => {
  const { state: contracts, } = useEth();
  // const { selectedResult } = useUserContext();
  const [name, setName] = useState();
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([{
    data: [0, 0]
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
        categories: [],
      }
    },
  );

  const getElectionsResult = async (electionContract, parties_add_list, constituenciesList) => {
    // const electionContract = new contracts.uninitialized[ContractName.NationalElection].web3.eth
    //   .Contract(contracts.uninitialized[ContractName.NationalElection].artifact.abi, props.electionAdd);

    let tempTotalVotes = 0;
    let tempCastedVotes = 0;

    for (let i = 0; i < constituenciesList.length; i++) {
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, constituenciesList[i]);

      // Get Total Votes of Constituency and Add
      tempTotalVotes += parseInt(await constContract.methods
        .total_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));

      // Get Casted Votes of Constituency and Add
      tempCastedVotes += parseInt(await constContract.methods
        .casted_votes_count()
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
    }

    // let partiesNamesList = [];  // Names
    let partiesWonSeatList = [];  // Votes Count
    for (let i = 0; i < parties_add_list.length; i++) {
      // const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
      //   .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties_add_list[i]);
      // console.log(partyContract);

      // const partyName = await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
      // partiesNamesList.push(Web3.utils.hexToUtf8(partyName));

      // Get Party Won Seats Count
      const wonSeats = parseInt(await electionContract.methods
        .getPartyWinCount(parties_add_list[i])
        .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] }));
      console.log(wonSeats);
      partiesWonSeatList.push(wonSeats);
    }
    return {
      totalVotes: tempTotalVotes,
      castedVotes: tempCastedVotes,
      partiesWonSeatList: partiesWonSeatList
    };

  }

  const loadGeneralResult = async () => {
    const geContract = new contracts.uninitialized[ContractName.GeneralElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.GeneralElection].artifact.abi, props.electionAdd);

    // Get Election Name
    setName(Web3.utils.hexToUtf8(await geContract.methods
      .name()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] })));
    // GET Start Date
    // Timestamp in seconds
    var unixStartTimestamp = parseInt(await geContract.methods
      .startTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));
    var unixEndTimestamp = parseInt(await geContract.methods
      .endTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));

    /* Create a new JavaScript Date object based on Unix timestamp.
    Multiplied it by 1000 to convert it into milliseconds */
    var _startDate = new Date(unixStartTimestamp * 1000);
    var _endDate = new Date(unixEndTimestamp * 1000);

    setStartTimestamp(_startDate.toLocaleDateString("en-GB") + ",  " + _startDate.toLocaleTimeString("en-US"));
    setEndTimestamp(_endDate.toLocaleDateString("en-GB") + ",  " + _endDate.toLocaleTimeString("en-US"));
    // // Generate date string
    // console.log(date.toLocaleDateString("en-US"));   // Prints: 5/6/2022
    // console.log(date.toLocaleDateString("en-GB"));   // Prints: 06/05/2022
    // console.log(date.toLocaleDateString("default")); // Prints: 5/6/2022

    // // Generate time string
    // console.log(date.toLocaleTimeString("en-US"));   // Prints: 1:10:34 PM
    // console.log(date.toLocaleTimeString("it-IT"));   // Prints: 13:10:34
    // console.log(date.toLocaleTimeString("default")); // Prints: 1:10:34 PM
    // GET End Date

    // Provincial Election Total Votes
    let tempTotalVotes = 0;
    // Provincial Election Casted Votes
    let tempCastedVotes = 0;

    // Get Parties
    const parties_count = parseInt(await contracts.initialized[ContractName.PartyManager].contract.methods
      .parties_count()
      .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] }));
    let parties_add_list = [];
    for (let i = 0; i < parties_count; i++) {
      parties_add_list.push(await contracts.initialized[ContractName.PartyManager].contract.methods
        .parties(i)
        .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] }));
    }

    const nationals_add = await geContract.methods
      .nationals()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
    const pp_provincial_add = await geContract.methods
      .provinces(Web3Converter.strToBytes8("PP"))
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
    const ps_provincial_add = await geContract.methods
      .provinces(Web3Converter.strToBytes8("PS"))
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
    const pk_provincial_add = await geContract.methods
      .provinces(Web3Converter.strToBytes8("PK"))
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
    const pb_provincial_add = await geContract.methods
      .provinces(Web3Converter.strToBytes8("PB"))
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });

    const naContract = new contracts.uninitialized[ContractName.NationalElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.NationalElection].artifact.abi, nationals_add);
    const na_constituenciesList = await naContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.NationalElection].accounts[0] });

    const ppContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, pp_provincial_add);
    const pp_constituenciesList = await ppContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

    const psContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, ps_provincial_add);
    const ps_constituenciesList = await psContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

    const pkContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, pk_provincial_add);
    const pk_constituenciesList = await pkContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

    const pbContract = new contracts.uninitialized[ContractName.ProvincialElection].web3.eth
      .Contract(contracts.uninitialized[ContractName.ProvincialElection].artifact.abi, pb_provincial_add);
    const pb_constituenciesList = await pbContract.methods
      .getConstituencies()
      .call({ from: contracts.uninitialized[ContractName.ProvincialElection].accounts[0] });

    let na_result = await getElectionsResult(naContract, parties_add_list, na_constituenciesList);
    let pp_result = await getElectionsResult(ppContract, parties_add_list, pp_constituenciesList);
    let ps_result = await getElectionsResult(psContract, parties_add_list, ps_constituenciesList);
    let pk_result = await getElectionsResult(pkContract, parties_add_list, pk_constituenciesList);
    let pb_result = await getElectionsResult(pbContract, parties_add_list, pb_constituenciesList);

    let partiesNamesList = [];  // Names
    for (let i = 0; i < parties_add_list.length; i++) {
      const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
        .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties_add_list[i]);

      const partyName = await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
      partiesNamesList.push(Web3.utils.hexToUtf8(partyName));
    }

    // Set Variables
    setTotalVotes(na_result.totalVotes + pp_result.totalVotes + ps_result.totalVotes + pk_result.totalVotes + pb_result.totalVotes);
    setCastedVotes(na_result.castedVotes + pp_result.castedVotes + ps_result.castedVotes + pk_result.castedVotes + pb_result.castedVotes);

    // Setup Chart
    const tempSeries = [
      { data: na_result.partiesWonSeatList },
      { data: pp_result.partiesWonSeatList },
      { data: ps_result.partiesWonSeatList },
      { data: pk_result.partiesWonSeatList },
      { data: pb_result.partiesWonSeatList },
    ];
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
          <p><b>Start Date & Time: </b>{startTimestamp}</p>
          <p><b>End Date & Time: </b>{endTimestamp}</p>

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
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([{
    data: [0, 0]
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
        categories: [],
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
    // Timestamp in seconds
    var unixStartTimestamp = parseInt(await peContract.methods
      .startTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));
    var unixEndTimestamp = parseInt(await peContract.methods
      .endTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));

    /* Create a new JavaScript Date object based on Unix timestamp.
    Multiplied it by 1000 to convert it into milliseconds */
    var _startDate = new Date(unixStartTimestamp * 1000);
    var _endDate = new Date(unixEndTimestamp * 1000);

    setStartTimestamp(_startDate.toLocaleDateString("en-GB") + ",  " + _startDate.toLocaleTimeString("en-US"));
    setEndTimestamp(_endDate.toLocaleDateString("en-GB") + ",  " + _endDate.toLocaleTimeString("en-US"));

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
          <p><b>Start Date & Time: </b>{startTimestamp}</p>
          <p><b>End Date & Time: </b>{endTimestamp}</p>

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

let ConstituencyStatContainer = (props) => {
  // props.provincialElectionAdd
  const { state: contracts, } = useEth();
  const { selectedResult } = useUserContext();
  const [name, setName] = useState();
  const [constName, setConstName] = useState();
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([{
    data: [0, 0]
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
        categories: [],
      }
    },
  );
  const loadConstituencyResult = async () => {
    const electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
      .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, props.electionAdd);

    // Set Election Name
    setName(Web3.utils.hexToUtf8(await electionContract.methods
      .name()
      .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] })));
    
    // GET Start Date
    // Timestamp in seconds
    var unixStartTimestamp = parseInt(await electionContract.methods
      .startTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));
    var unixEndTimestamp = parseInt(await electionContract.methods
      .endTime()
      .call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] }));

    /* Create a new JavaScript Date object based on Unix timestamp.
    Multiplied it by 1000 to convert it into milliseconds */
    var _startDate = new Date(unixStartTimestamp * 1000);
    var _endDate = new Date(unixEndTimestamp * 1000);

    setStartTimestamp(_startDate.toLocaleDateString("en-GB") + ",  " + _startDate.toLocaleTimeString("en-US"));
    setEndTimestamp(_endDate.toLocaleDateString("en-GB") + ",  " + _endDate.toLocaleTimeString("en-US"));



    // Get Constituency Contract Addresss
    const constAdd = await props.constAdd;

    const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
      .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, constAdd);

    // Set Const Name
    setConstName(Web3.utils.hexToUtf8(await constContract.methods
      .name()
      .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] })));

    // Set Total Votes Count
    const tempTotalVotes = parseInt(await constContract.methods
      .total_votes_count()
      .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));

    // Set Casted Votes Count
    const tempCastedVotes = parseInt(await constContract.methods
      .casted_votes_count()
      .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));

    // Parties Addresss List
    const tempPartiesAddList = await constContract.methods
      .getParties()
      .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] });
    const partiesAddList = tempPartiesAddList.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    // Party Votes Count
    let partiesVotesCount = [];
    for (let j = 0; j < partiesAddList.length; j++) {
      const party_votes = parseInt(await constContract.methods
        .parties_votes_count(partiesAddList[j])
        .call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] }));
      partiesVotesCount.push(party_votes);
    }

    // Set Party Names
    let partiesNamesList = [];
    for (let i = 0; i < partiesAddList.length; i++) {
      const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
        .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, partiesAddList[i]);

      const partyName = await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
      partiesNamesList.push(Web3.utils.hexToUtf8(partyName));
    }

    // Set Variables
    setTotalVotes(tempTotalVotes);
    setCastedVotes(tempCastedVotes);

    // Setup Chart
    const tempSeries = [{
      data: partiesVotesCount
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
    loadConstituencyResult();
  }, []);

  return (
    <div className="wp-block-group">
      <div
        style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <p><b>Election Name: </b>{name}</p>
          <p><b>Constituency: </b>{constName}</p>
          <p><b>Start Date & Time: </b>{startTimestamp}</p>
          <p><b>End Date & Time: </b>{endTimestamp}</p>

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
  const { selectedResult, user } = useUserContext();
  const [naConstAdd, setNaConstAdd] = useState();
  const [paConstAdd, setPaConstAdd] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const checkConstituency = async (constName) => {
    console.log("CONSTITUENCY NAME: ", constName);
    const electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
      .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, selectedResult.result_add);
    const constituency = await electionContract.methods
      .getConstituency(Web3Converter.strToBytes8(constName))
      .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] });
    console.log("CONSTITUENCY: ", constituency);

    try {
      if (Web3.utils.hexToUtf8(constituency).length === 0) {
        console.log(constituency, "=> FALSE");
        return false;
      }
      else {
        console.log(constituency, "=> TRUE");
        return true;
      }
    } catch (err) {
      if (constituency == "0x0000000000000000000000000000000000000000") {
        console.log(constituency, "=> FALSE");
        return false;
      }
      else {
        console.log(constituency, "=> TRUE");
        return true;
      }
    }
  };
  const getConstituency = async (constName) => {
    const electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
      .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, selectedResult.result_add);
    return await electionContract.methods
      .getConstituency(Web3Converter.strToBytes8(constName))
      .call({ from: contracts.uninitialized[ContractName.Election].accounts[0] });
  }
  const loadVoter = async () => {
    setIsLoaded(true);
    let isNA = await checkConstituency(user.na);
    let isPA = await checkConstituency(user.pa);
    if (isNA) {
      console.log("NA => TRUE");
      setNaConstAdd(getConstituency(user.na));
    }
    if (isPA) {
      console.log("PA => TRUE");
      setPaConstAdd(getConstituency(user.pa));
    }
  };
  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && !isLoaded)
      loadVoter();
  }, [contracts.initialized, user]);

  return (
    <>
      <Header isLanding={false} />
      <main className="result-page-main post-611 page type-page status-publish hentry theme-blue">

        {selectedResult.isOverall && (
          <>
            <h2>General Election Stats</h2>
            <GeneralStatContainer
              key={selectedResult.result_add}
              electionAdd={selectedResult.result_add}
            />
          </>
        )
        }
        {selectedResult.isProvincial && (
          <>
            <h2>Provincial Election Stats</h2>
            <ProvincialStatContainer
              key={selectedResult.result_add}
              electionAdd={selectedResult.result_add}
            />
          </>
        )
        }
        {selectedResult.isYourConst && (
          <>
            <h2>Your Constituencies Stats</h2>
            {naConstAdd && <ConstituencyStatContainer
              key={user ? user.na : "none"}
              electionAdd={selectedResult.result_add}
              constAdd={getConstituency("NA-1")}
            />}
            {paConstAdd && <ConstituencyStatContainer
              key={user ? user.pa : "none"}
              electionAdd={selectedResult.result_add}
              constAdd={getConstituency("PP-1")}
            />}
          </>
        )
        }
      </main>
    </>
  );
}

export default ResultPage;
