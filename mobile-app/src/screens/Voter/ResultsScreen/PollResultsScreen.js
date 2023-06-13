import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar } from 'react-native'
// import React, { useState } from 'react'
// import PollResult from '../../components/PollResult'
import TopNavBar from '../../../components/TopNavBar'
import ScreenName from '../../../components/ScreenName'
// import ProgressBarClassic from 'react-native-progress-bar-classic/lib/ProgressBarClassic'
import { useEth } from '../../../contexts/contexts'
import { ContractName } from '../../../contexts/EthContext/ContractName'
import Web3 from 'web3'
import Web3Converter from '../../../../utils/Web3Converter'

const colors = ['lightblue', 'lightgreen', 'lightyellow', 'lightsalmon', 'lightpink', 'lightcyan', 'lightcoral', 'lightseagreen', 'lightsteelblue', 'lightgoldenrodyellow', 'lightgray', 'lightseagreen', 'lightcyan', 'lightcoral', 'lightpink', 'lightblue', 'lightgreen', 'lightyellow', 'lightsalmon', 'lightsteelblue'];


let GeneralStatContainer = (props) => {
  const { state: contracts, } = useEth();
  const [name, setName] = useState();
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();
  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();
  const [ln, setLn] = useState([1, 1, 1, 1, 1]);

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

    setStartTimestamp(_startDate.toLocaleDateString("en-GB") + " " + _startDate.toLocaleTimeString("en-US"));
    setEndTimestamp(_endDate.toLocaleDateString("en-GB") + " " + _endDate.toLocaleTimeString("en-US"));
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
    console.log("logg -> ", na_constituenciesList.length, pp_constituenciesList.length)
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

    setSeries(tempSeries);
    setOptions(partiesNamesList);
    setLn([na_constituenciesList.length, pp_constituenciesList.length, ps_constituenciesList.length, pk_constituenciesList.length, pb_constituenciesList.length]);
    // console.log("length ->",ln);
  };
  useEffect(() => {
    loadGeneralResult();
  }, []);
  console.log("options -> ", options)
  console.log("serias -> ", series)
  return (
    <View>
      <Text><Text style={styles.bold}>Election Name: </Text>{name}</Text>
      <Text><Text style={styles.bold}>Start Date & Time: </Text>{startTimestamp}</Text>
      <Text><Text style={styles.bold}>End Date & Time: </Text>{endTimestamp}</Text>
      <Text><Text style={styles.bold}>Total Votes: </Text>{totalVotes}</Text>
      <Text><Text style={styles.bold}>Votes Casted: </Text>{castedVotes}</Text>
      {/* <View style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 6 }}>
        {
         options.map((name, index) => {
          let na = series[0]["data"][index];
          let pp = series[1]["data"][index];
          let ps = series[2]["data"][index];
          let pk = series[3]["data"][index];
          let pb = series[4]["data"][index];
          return (
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 5, alignItems: 'center' }} key={index}>
              <Text style={{ width: '20%' }}>{name}</Text>
              <View style={{width:'100%'}}>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((na / ln[0]) * 80)}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5 }}>{na}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((pp / ln[1]) * 80)}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5,marginTop:2 }}>{pp}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((ps / ln[2]) * 80)}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5,marginTop:2 }}>{ps}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((pk / ln[3]) * 80)}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5,marginTop:2 }}>{pk}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((pb / ln[4]) * 80)}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5,marginTop:2 }}>{pb}</Text>
              </View>
            </View>
          )
        }) 
        }
      </View> */}
    </View>
  );
};

let ProvincialStatContainer = (props) => {
  // props.provincialElectionAdd
  const { state: contracts, } = useEth();
  const [name, setName] = useState();
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();

  const [totalVotes, setTotalVotes] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState([]);
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

    setSeries(partiesWonSeatList);
    setOptions(partiesNamesList);
  };
  useEffect(() => {
    loadProvincialResult();
  }, []);
  return (
    <View>
      <Text><Text style={styles.bold}>Election Name: </Text>{name}</Text>
      <Text><Text style={styles.bold}>Start Date & Time: </Text>{startTimestamp}</Text>
      <Text><Text style={styles.bold}>End Date & Time: </Text>{endTimestamp}</Text>
      <Text><Text style={styles.bold}>Total Votes: </Text>{totalVotes}</Text>
      <Text><Text style={styles.bold}>Votes Casted: </Text>{castedVotes}</Text>
      <View style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 6 }}>
        {
          options.map((name, index) => {
            let val = series[index];
            if (val == undefined) {
              val = 0;
            }
            return (
              <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 5, alignItems: 'center' }} key={index}>
                <Text style={{ width: '20%' }}>{name}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((val / totalVotes) * 80) + 2}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5 }}>{val}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

let ConstituencyStatContainer = (props) => {
  const { state: contracts, } = useEth();
  const [name, setName] = useState();
  const [constName, setConstName] = useState();

  const [totalVotes, setTotalVotes] = useState();
  const [startTimestamp, setStartTimestamp] = useState();
  const [endTimestamp, setEndTimestamp] = useState();
  const [castedVotes, setCastedVotes] = useState();

  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState([]);
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


    setSeries(partiesVotesCount);
    setOptions(partiesNamesList);
  };
  useEffect(() => {
    loadConstituencyResult();
  }, []);
  return (
    <View>
      <Text><Text style={styles.bold}>Election Name: </Text>{name}</Text>
      <Text><Text style={styles.bold}>Constituency:  </Text>{constName}</Text>
      <Text><Text style={styles.bold}>Start Date & Time: </Text>{startTimestamp}</Text>
      <Text><Text style={styles.bold}>End Date & Time: </Text>{endTimestamp}</Text>
      <Text><Text style={styles.bold}>Total Votes: </Text>{totalVotes}</Text>
      <Text><Text style={styles.bold}>Votes Casted: </Text>{castedVotes}</Text>
      <View style={{ borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, borderRadius: 6 }}>
        {
          options.map((name, index) => {
            console.log(name, series[index])
            let val = series[index];
            if (val == undefined) {
              val = 0;
            }
            return (
              <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 5, alignItems: 'center' }} key={index}>
                <Text style={{ width: '20%' }}>{name}</Text>
                <Text style={{ backgroundColor: colors[index % colors.length], height: 20, width: `${((val / totalVotes) * 80) + 5}%`, borderRadius: 5, paddingHorizontal: 4, color: 'black', paddingLeft: 5 }}>{val}</Text>
              </View>
            )
          })
        }
      </View>
    </View>
  );
};

const PollResultsScreen = ({ route }) => {
  const { selectedResult } = route.params;
  console.log(selectedResult);
  const { state: contracts, } = useEth();
  const [naConstAdd, setNaConstAdd] = useState();
  const [paConstAdd, setPaConstAdd] = useState();
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
    let isNA = await checkConstituency("NA-1");
    let isPA = await checkConstituency("PP-1");
    if (isNA) {
      console.log("NA => TRUE");
      setNaConstAdd(getConstituency("NA-1"));
    }
    if (isPA) {
      console.log("PA => TRUE");
      setPaConstAdd(getConstituency("PP-1"));
    }


  };
  useEffect(() => {
    loadVoter();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Result"} center={false} />
        {selectedResult.isOverall && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>General Election Stats</Text>
            <GeneralStatContainer
              key={selectedResult.result_add}
              electionAdd={selectedResult.result_add}
            />
          </>
        )
        }
        {selectedResult.isProvincial && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Provincial Election Stats</Text>
            <ProvincialStatContainer
              key={selectedResult.result_add}
              electionAdd={selectedResult.result_add}
            />
          </>
        )
        }
        {selectedResult.isYourConst && (
          <>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Your Constituencies Stats</Text>
            {naConstAdd && <ConstituencyStatContainer
              key={"NA-1"}
              electionAdd={selectedResult.result_add}
              constAdd={getConstituency("NA-1")}
            />}
            <ScreenName heading={""} />
            {paConstAdd && <ConstituencyStatContainer
              key={"PP-1"}
              electionAdd={selectedResult.result_add}
              constAdd={getConstituency("PP-1")}
            />}
          </>
        )
        }

      </View>

    </ScrollView>
  )
}

export default PollResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 30,
    marginTop: 100
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
  }

});