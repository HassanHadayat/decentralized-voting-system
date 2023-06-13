import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, Alert } from 'react-native'
import React from 'react'
import TopNavBar from '../../components/TopNavBar';
import { useState } from 'react';
import { COLORS } from '../../colors';
import { ContractName } from "../../contexts/EthContext/ContractName";
import Web3Converter from '../../../utils/Web3Converter';
import { useEth } from '../../contexts/contexts';

const SignUpScreen = ({ navigation, route }) => {

  const { state: contracts, } = useEth();

  const [name, setName] = useState("Umer Farooq");
  const [age, setAge] = useState("22");
  const [gender, setGender] = useState("M");
  const [cnic, setCnic] = useState("35202-8940855-1");
  const [contact, setContact] = useState("0323-5760204");
  const [pass, setPass] = useState("123");

  const [captchaResponse, setCaptchaResponse] = useState("");
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
  const handleSignUp = async () => {
    try {
      if (!name || !age || !gender || !cnic || !contact || !pass) {
        Alert.alert("Empty Fields", "Kindly Input All Fields");
        return
      }
      const voter = {
        fullname: Web3Converter.strToBytes32(name),
        age: parseInt(age),
        gender: Web3Converter.strToBytes1(gender),
        cnic: Web3Converter.strToBytes16(cnic),
        contact: Web3Converter.strToBytes12(contact),
        password: Web3Converter.strToBytes16(pass)
      }
      let canReg = await contracts.initialized[ContractName.VoterManager].contract.methods
        .canRegister(voter.cnic)
        .call({ from: contracts.initialized[ContractName.VoterManager].accounts[0] });
      console.log(canReg);

      if (canReg) {
        setName(null);
        setAge(null);
        setGender(null);
        setContact(null);
        setCnic(null);
        setPass(null);
        navigation.navigate("Otp",{register:true})
      }
      else {
        Alert.alert("Registeration Failed!", "Invalid Credentials.");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View
      style={styles.container}
    >

      <StatusBar />
      <TopNavBar showLogout={true} />
      <View style={styles.mainContainer}>
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, alignItems: 'center', marginBottom: 30 }}>
          <Text style={styles.header}>Registration</Text>
        </View>
        {/* <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Full Name' /> */}
        <View style={styles.column}>
          <Text>Full Name</Text>
          <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Enter your full name' value={name} onChangeText={setName} />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={[styles.column, { width: '40%' }]}>
            <Text>Age</Text>
            <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Enter Age' value={age} onChangeText={setAge} maxLength={2} />
          </View>
          <View style={[styles.column, { width: '40%' }]}>
            <Text>Gender</Text>
            <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='M/F' value={gender} onChangeText={setGender} maxLength={1} />
          </View>

        </View>
        <View style={styles.column}>
          <Text>Contact</Text>
          <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='03xx-xxxxxxx' value={contact} onChangeText={setContact} />
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          {/* () => navigation.navigate("Otp") */}
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: 'black' }}>Already have account? <Text style={{ fontWeight: 'bold', color: COLORS.main }} onPress={() => navigation.navigate("SignIn")}>Sign In</Text></Text>
      </View>
    </View>
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
    color: 'white'
  }
});
export default SignUpScreen