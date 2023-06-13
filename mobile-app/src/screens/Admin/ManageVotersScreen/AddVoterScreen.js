import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
const AddPoliticalPartyScreen = () => {
  const { state: contracts, } = useEth();

  const [cnic, setCnic] = useState("");
  const [nA, setNA] = useState("");
  const [pA, setPA] = useState("");

  const navigation = useNavigation();
  const handleAddVoter = async () => {
    const voter = {
      cnic: Web3Converter.strToBytes16(cnic),
      na: Web3Converter.strToBytes8(nA),
      pa: Web3Converter.strToBytes8(pA)
    }
    try {
      const valu=await contracts.initialized[ContractName.VoterManager].contract.methods
        .addVoterConstituency(voter)
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0],gas: "1000000" });

      console.log(valu);
    } catch (err) {
      console.log(err);
    }

  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Add Voter"} center={true} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder="CNIC" value={cnic} onChangeText={setCnic} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='National Assembly Constituency' value={nA} onChangeText={setNA} />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Provincial Assembly Constituency' value={pA} onChangeText={setPA} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddVoter}>
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>

    </View>
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
  input: {
    minHeight: 50,
    marginTop: 31,
    paddingLeft: 12,
    backgroundColor: "rgba(255,255,255,40)",
    color: "black",
    borderRadius: 6,
    elevation: 10
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30
  },
  button: {
    minWidth: '75%',
    minHeight: 40,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    color: 'white'
  }
});
export default AddPoliticalPartyScreen