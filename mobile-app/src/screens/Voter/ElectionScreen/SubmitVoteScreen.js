

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar,TextInput, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../../../colors';
import TopNavBar from '../../../components/TopNavBar';
import RadioButton from '../../../components/RadioButton';
import ScreenName from '../../../components/ScreenName';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
import Web3 from 'web3';

import AsyncStorage from '@react-native-async-storage/async-storage';



const SubmitVoteScreen = ({route}) => {
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
  const [isLoaded, setIsLoaded] = useState(false);
  const { state: contracts, } = useEth();
  const selectedPoll=route.params["selectedPoll"]
  
  const [candidatesList, setCandidatesList] = useState([]);
  const [user, setUser] = useState(null);
  const [isVoteCasted, setIsVoteCasted] = useState();
  
  const [voteBtnText, setVoteBtnText] = useState("Submit Vote");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  
  const loadCandidatesList = async () => {
    try {
      // console.log(selectedPoll.constituencyAdd);
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, selectedPoll.constituencyAdd);
      const parties = await constContract.methods.getParties().call({ from: contracts.uninitialized
        [ContractName.Constituency].accounts[0] });
        // const election_type = await constContract.methods.election_type().call({ from: contracts.uninitialized[ContractName.GeneralElection].accounts[0] });
      // console.log(parties);
        const tempCandsList = [];
        // const tempCandsList = [...candidatesList];
      console.log("selected poll ",selectedPoll.pollName);
      for (let i = 0; i < parties.length; i++) {
        try {
          const partyContract = new contracts.uninitialized[ContractName.Party].web3.eth
            .Contract(contracts.uninitialized[ContractName.Party].artifact.abi, parties[i]);
          
            const partyCandDetail = await partyContract.methods.getElectionConstituencyDetail(Web3Converter.strToBytes8(selectedPoll.pollName))
            .call({ from: contracts.uninitialized[ContractName.Party].accounts[0] });
          tempCandsList.push({
            id: (tempCandsList.length > 0) ? tempCandsList[tempCandsList.length - 1].id + 1 : 0,
            party_alias: Web3.utils.hexToUtf8(partyCandDetail.party_alias),
            party_name: Web3.utils.hexToUtf8(partyCandDetail.party_name),
            cand_name: Web3.utils.hexToUtf8(partyCandDetail.candidate_name),
            candidate_cnic: partyCandDetail.candidate_cnic,
            party_add: parties[i]
          });

          // console.log(Web3.utils.hexToUtf8(partyCandDetail.candidate_name));
          // console.log(Web3.utils.hexToUtf8(partyCandDetail.party_name));
          // console.log(Web3.utils.hexToUtf8(partyCandDetail.party_alias));
        } catch (err) {
          console.log("loop error -> ",err);
        }

      }
      // console.log(tempCandsList);
      setCandidatesList(tempCandsList);
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts && candidatesList.length < 1 && !isLoaded
      && selectedPoll.constituencyAdd)
      loadCandidatesList();
  }, [contracts.initialized, candidatesList, selectedPoll]);
  const loadVoteCastBtn = async () => {
    try {
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, selectedPoll.constituencyAdd);

      const isVoteCasted = await constContract.methods.isVoteCasted(Web3Converter.strToBytes16(user.cnic)).call({ from: contracts.uninitialized[ContractName.Constituency].accounts[0] })
      setIsVoteCasted(isVoteCasted);
      console.log("ehhleh -< ",isVoteCasted);
      if (isVoteCasted)
        setVoteBtnText("Report Vote");
      else
        setVoteBtnText("Submit Vote");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (contracts.initialized && contracts.initialized[ContractName.ElectionManager].accounts) {
      loadVoteCastBtn();
    }
  }, [contracts.initialized, user]);
  
  const handleSubmit = () => {
    // console.log("Selected Candidate:", selectedCandidate);
    submitVote();
  };
  const submitVote = async () => {

    try {
      if(!selectedCandidate){
        Alert.alert("Select Candidate","Kindly Select a candidate to submit the vote");
      }
    
      const electionContract = new contracts.uninitialized[ContractName.Election].web3.eth
        .Contract(contracts.uninitialized[ContractName.Election].artifact.abi, selectedPoll.electionAdd);
      const constContract = new contracts.uninitialized[ContractName.Constituency].web3.eth
        .Contract(contracts.uninitialized[ContractName.Constituency].artifact.abi, selectedPoll.constituencyAdd);

      const currTime = parseInt(Math.floor(Date.now() / 1000));

      await electionContract.methods.castVote(
        currTime,
        selectedPoll.constituencyAdd,
        Web3Converter.strToBytes16(user.cnic),
        selectedCandidate.candidate_cnic,
        selectedCandidate.party_add
      ).send({ from: contracts.uninitialized[ContractName.Election].accounts[0],gas: "10000000" });
      loadVoteCastBtn();  
      Alert.alert("Vote Casted","You succesffully casted the vote");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
      <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',marginBottom:10}}>

      <Text style={{fontSize:23,fontWeight:'bold'}}>{selectedPoll.pollName}</Text>
      <Text style={{fontSize:23,fontWeight:'bold'}}>{selectedPoll.electionName}</Text>
      </View>
      {/* <TextInput style={styles.input} placeholder='Search for candidate or party...' placeholderTextColor={'black'} /> */}
        
        <RadioButton data={candidatesList} onSelect={(candidate_cnic,party_add) => setSelectedCandidate({candidate_cnic,party_add})}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button,{backgroundColor:isVoteCasted?'red':COLORS.main}]} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>{voteBtnText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
export default SubmitVoteScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 70,
  },
  buttonContainer: {
    marginTop: 15,
    marginBottom: 25,
  },
  button: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.main
  },
      input: {
        minHeight: 50,
        // marginTop: 31,
        paddingLeft: 12,
        backgroundColor: "rgba(255,255,255,40)",
        color: "black",
        borderRadius: 6,
        elevation: 10
    },
});

// import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, TextInput } from 'react-native'
// import React from 'react'
// import { ElectionButton } from '../components/Buttons';
// import { useNavigation } from '@react-navigation/native';
// import TopNavBar from '../components/TopNavBar';
// import Admin from '../components/Admin';
// import Home from '../components/Home';
// import ScreenName from '../components/ScreenName';
// import { COLORS } from '../colors';

// // import { HomeButton } from '../components/Buttons'

// const SubmitVomitScreen = () => {
//     const navigation = useNavigation();
//     return (
//         <View style={styles.container}>
//             <StatusBar />
//             <TopNavBar />
//             <View style={styles.mainContainer}>
//                 <ScreenName heading={"General Elections 2023"} center={false} />
//                 <TextInput style={styles.input} placeholder='Search for candidate or party...' placeholderTextColor={'black'} />
//                 <View style={{ marginVertical: 10, padding: 20,flex:1,display:'flex' }}>
//                     <View style={{ backgroundColor: 'green' }}><Text>New</Text></View>
//                     <Text>Hello</Text>
//                 </View>
//                 {/* <View style={styles.buttonContainer}> */}
//                 <TouchableOpacity style={styles.button}>
//                     <Text style={styles.text}>Submit</Text>
//                 </TouchableOpacity>
//                 {/* </View> */}
//             </View>

//         </View>
//     )
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // justifyContent: 'center',
//         backgroundColor: 'white',
        
//     },
//     mainContainer: {
//         paddingHorizontal: 40,
//         marginTop: 100,
//         flex:1,
//         marginBottom:20
//     },
//     input: {
//         minHeight: 50,
//         // marginTop: 31,
//         paddingLeft: 12,
//         backgroundColor: "rgba(255,255,255,40)",
//         color: "black",
//         borderRadius: 6,
//         elevation: 10
//     },
//     buttonContainer: {
//         alignItems: 'center',
//         marginTop: 30
//     },
//     button: {
//         minWidth: '75%',
//         minHeight: 40,
//         backgroundColor: COLORS.main,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 6,
//     },
//     text: {
//         color: 'white'
//     }
// });
// export default SubmitVomitScreen
