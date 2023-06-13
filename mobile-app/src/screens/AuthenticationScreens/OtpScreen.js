import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableOpacity, Image, StatusBar, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import TopNavBar from '../../components/TopNavBar';
import OTPTextView from 'react-native-otp-textinput'
import { COLORS } from '../../colors';

const SignUpScreen = ({ route }) => {
  const [otp, setOtp] = useState('');
  const submit = () => {
    if (otp.length != 4) {
      Alert.alert("Otp Invalid", "Kindly Enter Otp correctly");
      return;
    }
    if (route.params["register"]) {

      Alert.alert("Regitsered Successfully", "Kindly Navigate to the sign screen")
    } else {
      navigation.navigate("Home")
    }
  }
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={{ paddingHorizontal: 20 }}>

        <Text style={styles.header}>Enter your 6-Digit Otp Code</Text>
        <OTPTextView
          handleTextChange={setOtp}
          tintColor={COLORS.main}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={4}
          inputCellLength={1}

        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={styles.text}>Submit</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', color: COLORS.main,marginTop:10 }} onPress={() => navigation.navigate("SignIn")}>Go to Sign In</Text>

        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    color: 'black'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  button: {
    minWidth: '100%',
    minHeight: 40,
    backgroundColor: COLORS.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    color: 'white'
  },

  textInputContainer: {
    marginVertical: 20,
  },
  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 4
  },
});
export default SignUpScreen