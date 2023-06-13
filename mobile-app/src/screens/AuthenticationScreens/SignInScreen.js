import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, StyleSheet, Image, StatusBar, Alert } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import TopNavBar from '../../components/TopNavBar';
import { useState } from 'react';
import { COLORS } from '../../colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {WebView} from 'react-native-webview';
// import Recaptcha from 'react-native-recaptcha-that-works';
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../../utils/Web3Converter';
import { useEth } from '../../contexts/contexts';
import Web3 from 'web3';
import auth from '@react-native-firebase/auth';
const SignInScreen = ({ navigation, route }) => {
  const { state: contracts, } = useEth();
  const [cnic, setCnic] = useState("00000-0000000-0");
  const [pass, setPass] = useState("00000");


  // handleSendCode = () => {
  //   // Request to send OTP
  //   if (this.validatePhoneNumber()) {
  //     firebase
  //       .auth()
  //       .signInWithPhoneNumber(this.state.phone)
  //       .then(confirmResult => {
  //         this.setState({ confirmResult })
  //       })
  //       .catch(error => {
  //         alert(error.message)
  //         console.log(error)
  //       })
  //   } else {
  //     alert('Invalid Phone Number')
  //   }
  // }
  const temp = async () => {
    try {

      // const confirmation = await auth().signInWithPhoneNumber("+923081674699");
      await auth().signInWithPhoneNumber("+923081674699")
        // await auth().signInWithPhoneNumber("+923069363399")
        .then((confirmResult) => {
          confirmResult.confirm("123123")
            .then((user) => {
              console.log("logged in ", user);
            })
            .catch((err) => {
              console.error("1 ", err);
            });
        })
        .catch((err) => {
          console.error("2 ", err);
        });
    } catch (err) {
      console.error(err);
    }
  }
  const storeData = async (key, value) => {

    try {
      await AsyncStorage.setItem(key, value);
      console.log('Data stored successfully.');
    } catch (error) {
      console.log('Error while storing data:', error);
    }
  };

  const handleCnicChange = (value) => {
    var regex;
    var digitsOnly = value.replace(/\D/g, ''); // Remove non-digits

    if (digitsOnly.length > 12) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, 12), '-', digitsOnly.slice(12)].join('');
      regex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    } else if (digitsOnly.length > 5) {
      value = [digitsOnly.slice(0, 5), '-', digitsOnly.slice(5, digitsOnly.length)].join('');
      regex = /^[0-9]{5}-[0-9]*$/;
    } else if (digitsOnly.length <= 5) {
      value = digitsOnly.slice(0, digitsOnly.length);
      regex = /^\d+-?\d*$/;
    }
    if ((regex.test(value) && value.length <= 15) || value === "") {
      setCnic(value);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!cnic || !pass) {
        Alert.alert("Empty Fields", "Kindly Input All Fields");
        return
      }
      const voter = {
        cnic: Web3Converter.strToBytes16(cnic),
        password: Web3Converter.strToBytes16(pass)
      }

      const voterAdd = await contracts.initialized[ContractName.VoterManager].contract.methods
        .signinVoter(voter.cnic, voter.password)
        .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
        if (voterAdd == 0x0000000000000000000000000000000000000000) {
        console.log('Invalid Credentials');
        Alert.alert("Signin Failed!", "Invalid Credentials.");
        setCnic('');
        setPass('');
      }
      else {
        try {
          const voterContract = new contracts.uninitialized[ContractName.Voter].web3.eth
            .Contract(contracts.uninitialized[ContractName.Voter].artifact.abi, voterAdd);
          const voter = {
            name: Web3.utils.hexToUtf8(await voterContract.methods.fullname().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
            cnic: Web3.utils.hexToUtf8(await voterContract.methods.cnic().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
            contact: Web3.utils.hexToUtf8(await voterContract.methods.contact().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
            na: Web3.utils.hexToUtf8(await voterContract.methods.na_constituency().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
            pa: Web3.utils.hexToUtf8(await voterContract.methods.pa_constituency().call({ from: contracts.uninitialized[ContractName.Voter].accounts[0] })),
          };
          // const _isAdmin = await contracts.initialized[ContractName.VoterManager].contract.methods
          // .isAdmin(Web3Converter.strToBytes16(voter.cnic))
          // .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
          await storeData('user', JSON.stringify(voter));
          navigation.navigate("Otp",{"register":false});
        }
        catch (err) {
          console.log(err);
          Alert.alert("Signin Failed!", "Try again.");
          setCnic('');
          setPass('');
        }
      }
    }
    catch (err) {
      console.error("Sign In -> ", err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TopNavBar showLogout={true} />
      <View style={styles.mainContainer}>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, alignItems: 'center', marginBottom: 30 }}>
          <Text style={styles.header}>Sign In</Text>
        </View>
        <View style={styles.column}>
          <Text>Cnic</Text>
          <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='xxxxx-xxxxxxx-x' value={cnic} onChangeText={(value) => handleCnicChange(value)} />
        </View>

        <View style={styles.column}>
          <Text>Password</Text>
          <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Enter Password' value={pass} onChangeText={setPass} secureTextEntry={true} />
        </View>
      </View>


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          {/* <TouchableOpacity style={styles.button} onPress={temp}> */}
          <Text style={{ color: 'white' }}>Sign In</Text>
        </TouchableOpacity>
        <Text style={[{ marginTop: 10 }, styles.text]}>Does not have any account? <Text style={{ fontWeight: 'bold', color: COLORS.main }} onPress={() => navigation.navigate("SignUp")}>Sign up</Text></Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  column: {
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    margin: 40
  },
  header: {
    fontSize: 30,
    color: 'black',
    marginBottom: 15
  },
  input: {
    minHeight: 50,
    marginTop: 5,
    paddingLeft: 12,
    backgroundColor: "rgba(255,255,255,40)",
    color: "black",
    borderRadius: 6,
    elevation: 10
  },
  buttonContainer: {
    alignItems: 'center'
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
    color: 'black'
  }
});

export default SignInScreen