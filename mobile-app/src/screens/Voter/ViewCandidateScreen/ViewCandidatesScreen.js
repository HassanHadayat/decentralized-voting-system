import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../../components/TopNavBar'
import ScreenName from '../../../components/ScreenName'
import { useNavigation } from '@react-navigation/native'
import { useEth } from '../../../contexts/contexts'
import { ContractName } from '../../../contexts/EthContext/ContractName'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Web3 from 'web3'
import Web3Converter from '../../../../utils/Web3Converter'

let CnadidateItem = (props) => {

  const handleOpenChange = () => {
    props.setOpen(!props.isOpen);
  };
  return (
    <View style={styles.electionContainer}>
      <TouchableOpacity style={styles.electionContainerHeader} onPress={handleOpenChange}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, }} >{props.candidate.fullname}</Text>
        <MaterialIcons name={props.isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="black" />
      </TouchableOpacity>
      {
        props.isOpen &&
        <View>
          <Text><Text style={styles.bold}>Age:</Text> {props.candidate.age}</Text>
          <Text><Text style={styles.bold}>Gender:</Text> {props.candidate.gender}</Text>
          <Text><Text style={styles.bold}>Father Name:</Text> {props.candidate.fathername}</Text>
          <Text><Text style={styles.bold}>CNIC:</Text> {props.candidate.cnic}</Text>
          <Text><Text style={styles.bold}>Contact:</Text> {props.candidate.contact}</Text>
          <Text><Text style={styles.bold}>Permanent Address:</Text> {props.candidate.permanent_add}</Text>
          <Text><Text style={styles.bold}>Local Address:</Text> {props.candidate.local_add}</Text>
          <Text><Text style={styles.bold}>Province:</Text> {props.candidate.province}</Text>
          <Text><Text style={styles.bold}>Party:</Text> {props.candidate.party}</Text>
          <Text><Text style={styles.bold}>Constituencies:</Text> {props.candidate.constituencies_list.length > 0 ? props.candidate.constituencies_list.map((constituency, index) => {
            return index === props.candidate.constituencies_list.length - 1 ? `${constituency}` : `${constituency}, `;
          }) : "None"}</Text>

        </View>
      }
    </View>
  );
};

const ViewCandidateScreen = () => {

  const navigation = useNavigation();
  const { state: contracts, } = useEth();
  const [candidatesList, setCandidatesList] = useState([]);
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
    if (contracts.initialized && contracts.initialized[ContractName.CandidateManager].accounts && candidatesList.length < 1 && !isLoaded)
      loadCandidates();
  }, [contracts.initialized, candidatesList]);

  const loadCandidates = async () => {
    try {
      setIsLoaded(true);
      const cands_add_list = await contracts.initialized[ContractName.CandidateManager].contract
        .methods.getCandidates()
        .call({ from: contracts.initialized[ContractName.CandidateManager].accounts[0] });
      console.log("Cands List => ", cands_add_list);
      let tempCandidatesList = [...candidatesList];

      for (let i = 0; i < cands_add_list.length; i++) {
        try {

          const candContract = new contracts.uninitialized[ContractName.Candidate].web3.eth
            .Contract(contracts.uninitialized[ContractName.Candidate].artifact.abi, cands_add_list[i]);
          const temp_cand_const_list = await candContract.methods.getConstituencies().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] });
          console.log(temp_cand_const_list);
          let cand_const_list = [];
          for (let j = 0; j < temp_cand_const_list.length; j++) {
            cand_const_list.push(Web3.utils.hexToUtf8(temp_cand_const_list[j]));
          }
          console.log(cand_const_list);
          let cand = {
            fullname: Web3.utils.hexToUtf8(await candContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            fathername: Web3.utils.hexToUtf8(await candContract.methods.father_name().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            age: parseInt(await candContract.methods.age().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            gender: Web3.utils.hexToUtf8(await candContract.methods.gender().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            cnic: Web3.utils.hexToUtf8(await candContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            contact: Web3.utils.hexToUtf8(await candContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            permanent_add: Web3.utils.hexToUtf8(await candContract.methods.permanent_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            local_add: Web3.utils.hexToUtf8(await candContract.methods.local_add().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            province: Web3.utils.hexToUtf8(await candContract.methods.province().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] })),
            constituencies_list: cand_const_list,
            party: Web3.utils.hexToUtf8(await candContract.methods.party().call({ from: contracts.uninitialized[ContractName.Candidate].accounts[0] }))
          };
          tempCandidatesList.push(cand);
          setCandidatesList([...tempCandidatesList]);
        }
        catch (err) {
          console.log(err);
        }
      }
    }
    catch (err) {
      console.error("View Candidates Screen -> ", err)
    }
  };
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Candidates"} center={false} />
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>You can see all candidates here</Text>
        <View style={{ marginVertical: 20 }}>

          {
            candidatesList.map((candidate, index) => {
              const isOpen = index === openIndex;
              return (
                <CnadidateItem
                  key={index + candidate.cnic}
                  candidate={candidate}
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

export default ViewCandidateScreen;

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