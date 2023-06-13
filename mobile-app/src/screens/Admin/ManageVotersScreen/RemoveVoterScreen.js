import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
const RemoveVoter = () => {
  const navigation = useNavigation();
  const { state: contracts, } = useEth();

  const [cnic, setCnic] = useState("3");
  
  const handleRemoveVoter = async () => {
    console.log(cnic);
    
    const cnicBytes32 = Web3Converter.strToBytes16(cnic);
    try{
    
      const val=await contracts.initialized[ContractName.VoterManager].contract.methods
        .removeVoterConstituency(cnicBytes32)
        .send({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });

    console.log(val);
    }catch(err){
      console.log(err);
    }
    // console.log(cnic);
  }
  
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Remove Voter"} center={true}/>
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder="xxxxx-xxxxxxx-x" value={cnic} onChangeText={setCnic}/>
        </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRemoveVoter}>
          <Text style={styles.text}>Remove</Text>
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
    marginTop:30
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
export default RemoveVoter