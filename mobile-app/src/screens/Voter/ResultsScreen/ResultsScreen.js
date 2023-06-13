import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/TopNavBar'
import ScreenName from '../../../components/ScreenName'
import { useNavigation } from '@react-navigation/native'
import { useEth } from '../../../contexts/contexts'
import { ContractName } from '../../../contexts/EthContext/ContractName'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Web3 from 'web3';

import AsyncStorage from '@react-native-async-storage/async-storage';


let ElectionResultBtn = (props) => {

  const navigation = useNavigation();
  // const { handleSelectedResult } = useUserContext();
  // const navigate = useNavigate();

  // const closedClassName = "accordion-section-header";
  // const openClassName = "accordion-section-header open";

  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };
  const handleShowResult = (isOverall, isProvincial, isYourConst) => {
    let newSelected = { result_add: props.result.result_add, isYourConst: isYourConst, isProvincial: isProvincial, isOverall: isOverall }
    navigation.navigate("PollResult", { selectedResult: newSelected });
  }
  return (
    <View style={styles.electionContainer}>
      <TouchableOpacity style={styles.electionContainerHeader} onPress={handleOpenChange}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, }} >{props.result.name}</Text>
        <MaterialIcons name={props.isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
      </TouchableOpacity>
      {
        props.isOpen &&
        <View>
          <Text>{props.result.date}</Text>
          {
            props.result.isCE &&
            <Text style={styles.electionBtn} onPress={() => handleShowResult(false, false, true)}>Stats of your Constituencies</Text>

          }
          {
            (props.result.isPE && !props.result.isGE)
            &&
            <Text style={styles.electionBtn} onPress={() => handleShowResult(false, true, false)}>Stats of Overall Result</Text>
          }
          {
            (props.result.isGE && props.result.isPE)
            &&
            <Text style={styles.electionBtn} onPress={() => handleShowResult(true, false, false)}>Stats of Overall Result</Text>
          }
        </View>
      }
    </View>
  );
};

const ResultsScreen = () => {
  const navigation = useNavigation();
  const { state: contracts, } = useEth();
  const [user, setUser] = useState(null);
  const [resultsList, setResultsList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [currTimestamp, setCurrTimestamp] = useState(0);
  const handleOpenChange = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const loadUserData = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data) {
      setUser(JSON.parse(data));
    } else {
      navigation.navigate("Start");
    }
  }
  useEffect(() => {
    loadUserData();
  }, [user])
  useEffect(() => {
    setCurrTimestamp(Math.floor(Date.now() / 1000));
    const interval = setInterval(() => {
      const _currentTimestamp = Math.floor(Date.now() / 1000);
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
    if (!user) {
      return;
    }
    setIsLoaded(true);
    // Getting Results(Election) Contract Addresses
    const results_add_list = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.getResults(currTimestamp)
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
    // const prevResultsList = [...resultsList]
    let tempResultsList = [];
    for (let i = 0; i < results_add_list.length; i++) {
      let electionContract = Web3.utils.asciiToHex("");
      let election_type = Web3.utils.asciiToHex("");
      electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
        .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, results_add_list[i]);
      election_type = await electionContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.Election].accounts[0] });
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
    setResultsList(tempResultsList);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Election Results"} center={false} />
        <Text>You can find results on elections from 2005 to the present.</Text>
        {/* All elections */}
        <View style={{ marginVertical: 20 }}>

          {
            resultsList.map((result, index) => {
              const isOpen = index === openIndex;
              return (
                <ElectionResultBtn
                  key={result.name + index}
                  result={result}
                  isOpen={isOpen}
                  setOpen={() => handleOpenChange(index)}
                ></ElectionResultBtn>
              );
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default ResultsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 30,
    marginTop: 100
  },
  electionContainer: {
    borderBottomColor: 'black',
    // borderBottomWidth: 2,
    marginBottom: 20,
    borderTopWidth: 2,
    paddingVertical: 10,
  },
  electionContainerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  electionBtn: {
    marginVertical: 5,
    color: "blue"
  }

})