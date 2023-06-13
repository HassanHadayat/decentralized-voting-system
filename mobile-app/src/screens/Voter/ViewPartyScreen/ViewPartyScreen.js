import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/TopNavBar'
import ScreenName from '../../../components/ScreenName'
import { useNavigation } from '@react-navigation/native'
import { useEth } from '../../../contexts/contexts'
import { ContractName } from '../../../contexts/EthContext/ContractName'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Web3 from 'web3'

import PartyCandidates from './PartyCandidates'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { COLORS } from '../../../colors'
import Web3Converter from '../../../../utils/Web3Converter'

// const Tab = createMaterialTopTabNavigator();

let PartyItem = (props) => {

  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };
  console.log(props)
  return (
    <View style={styles.electionContainer}>
      <TouchableOpacity style={styles.electionContainerHeader} onPress={handleOpenChange}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, }} >{props.party.name}</Text>
        <MaterialIcons name={props.isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
      </TouchableOpacity>
      {
        props.isOpen &&
        <View>
          <Text><Text style={styles.bold}>Chairman:</Text> {props.party.chairmanName}</Text>
          <Text><Text style={styles.bold}>CNIC:</Text> {props.party.chairmanCnic}</Text>
          <Text><Text style={styles.bold}>Alias:</Text> {props.party._alias}</Text>
          <Text><Text style={styles.bold}>Postal Address:</Text> {props.party.postal_add}</Text>
          <View style={{marginTop: 10,borderWidth:1,borderRadius:10,paddingHorizontal:10,paddingVertical:5}}>
            <View>
              {/* <ScreenName heading={"List of NA Candidates"} /> */}
              <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>NA Constituency</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Name</Text>
              </View>
              {
                props.party.na_cands_list.map((candidate, index) => {
                  return (
                    <View key={index} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{candidate.constituency}</Text>
                      <Text>{candidate.name}</Text>
                    </View>
                  )
                })
              }
            </View>
            <View style={{borderWidth:1,marginVertical:8}}></View>
            <View>
              {/* <ScreenName heading={"List of PA Candidates"} /> */}
              <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>PA Constituency</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Name</Text>
              </View>
              {
                props.party.pa_cands_list.map((candidate, index) => {
                  return (
                    <View key={index} style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>{candidate.constituency}</Text>
                      <Text>{candidate.name}</Text>
                    </View>
                  )
                })
              }
            </View>
          </View>
        </View>

      }
    </View>
  );
};

const ViewPartyScreen = () => {

  const navigation = useNavigation();
  const { state: contracts, } = useEth();
  const [partiesList, setPartiesList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const handleOpenChange = (index) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.PartyManager].accounts && partiesList.length < 1 && !isLoaded)
      loadParties();
  }, [contracts.initialized, partiesList]);

  const loadParties = async () => {
    try{
    setIsLoaded(true);


    const parties_add_list = await contracts.initialized[ContractName.PartyManager].contract
      .methods.getParties()
      .call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
    console.log("Parties List => ", parties_add_list);
    let tempPartiesList = [...partiesList];

    for (let i = 0; i < parties_add_list.length; i++) {
      try {

        const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
          .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties_add_list[i]);

        const tempConstituenciesList = await partyContract.methods.getConstituencies().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
        let na_constituenciesList = [];
        let pa_constituenciesList = [];
        for (let i = 0; i < tempConstituenciesList.length; i++) {
          const constName = Web3.utils.hexToUtf8(tempConstituenciesList[i]);

          const party_constituencies = await partyContract.methods.party_constituencies(tempConstituenciesList[i]).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
          const candidate_add = await partyContract.methods.candidates(party_constituencies.candidate_cnic).call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });

          const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
            .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, candidate_add);

          const cand_name = Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] }));
          if (constName[0] == 'N') {
            na_constituenciesList.push({ name: cand_name, constituency: constName });
          }
          else if (constName[0] == 'P') {
            pa_constituenciesList.push({ name: cand_name, constituency: constName });
          }
        }
        console.log(na_constituenciesList);
        console.log(pa_constituenciesList);

        let party = {
          name: Web3.utils.hexToUtf8(await partyContract.methods.name().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          chairmanName: Web3.utils.hexToUtf8(await partyContract.methods.getChairmanName().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          chairmanCnic: Web3.utils.hexToUtf8(await partyContract.methods.getChairmanCnic().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          postal_add: Web3.utils.hexToUtf8(await partyContract.methods.postal_add().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),
          _alias: Web3.utils.hexToUtf8(await partyContract.methods._alias().call({ from: contracts.uninitialized[ContractName.Party].accounts[0] })),

          na_cands_list: na_constituenciesList.sort((a, b) => a.constituency.localeCompare(b.constituency)),
          pa_cands_list: pa_constituenciesList.sort((a, b) => a.constituency.localeCompare(b.constituency))
        };

        tempPartiesList.push(party);
        setPartiesList([...tempPartiesList]);
      }
      catch (err) {
        console.log(err);
      }
    }
  }
  catch(err){
    console.error("ViewPartyScreen ",err);
  }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Parties"} center={false} />
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>You can see all parties here</Text>

        <View style={{ marginVertical: 20 }}>

          {
            partiesList.map((party, index) => {
              const isOpen = index === openIndex;
              return (
                <PartyItem
                  key={index + party.name}
                  party={party}
                  isOpen={isOpen}
                  setOpen={() => handleOpenChange(index)}
                />
              );
            })
          }
        </View>
      </View>
    </ScrollView>
  )
}

export default ViewPartyScreen;

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
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 15,
  }

})