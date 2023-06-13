import { View, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
import Web3 from 'web3';
import { ElectionButton } from '../../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ElectionsScreen = () => {
  const [user, setUser] = useState(null);

  const { state: contracts, } = useEth();
  const [electionsList, setElectionsList] = useState([
  ]);
  const [currTimestamp, setCurrTimestamp] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);
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
      loadElections();
  }, [currTimestamp]);

  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && electionsList.length < 1 && !isLoaded)
      loadElections();
  }, [contracts.initialized, electionsList]);

  const loadElections = async () => {
    try {
      setIsLoaded(true);
      if (!user) return;
      let na_prompt = user.na;
      let pa_prompt = user.pa;
      // console.log(user,currTimestamp);
      // console.log("Curr Time: ", currTimestamp);
      // console.log(contracts.initialized[ContractName.ElectionManager].accounts[5]);
      const na_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
      .methods.getElectionConstituency(Web3Converter.strToBytes8(na_prompt), currTimestamp)
      .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
      console.log(na_electionsList);
      const pa_electionsList = await contracts.initialized[ContractName.ElectionManager].contract
        .methods.getElectionConstituency(Web3Converter.strToBytes8(pa_prompt), currTimestamp)
        .call({ from: contracts.initialized[ContractName.ElectionManager].accounts[0] });
      // console.log(pa_electionsList);

      let newElectionsList = [];
      for (let i = 0; i < na_electionsList.election_names.length; i++) {
        newElectionsList.push({ name: Web3.utils.hexToUtf8(na_electionsList.election_names[i]), electionAdd: na_electionsList.election_adds[i], constituency: na_prompt, constituencyAdd: na_electionsList.const_adds[i] });
      }
      for (let i = 0; i < pa_electionsList.election_names.length; i++) {
        newElectionsList.push({ name: Web3.utils.hexToUtf8(pa_electionsList.election_names[i]), electionAdd: pa_electionsList.election_adds[i], constituency: pa_prompt, constituencyAdd: pa_electionsList.const_adds[i] });
      }

      setElectionsList(newElectionsList);
      // console.log(newElectionsList);
    } catch (err) {
      console.error("election screen -> ", err)
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Elections"} center={false} />
        <View style={styles.btnContainer}>
          {
            electionsList.map((election, index) => {
              return (
                <ElectionButton imgUrl={require("../../../../assets/images/ElectionBox.png")}
                  key={election.name + election.constituency + index}
                  electionName={election.name}
                  electionAdd={election.electionAdd}
                  electionConstituency={election.constituency}
                  constituencyAdd={election.constituencyAdd} />
              )
            })
          }

        </View>
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 40,
    marginTop: 100
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20
  },

});

export default ElectionsScreen;