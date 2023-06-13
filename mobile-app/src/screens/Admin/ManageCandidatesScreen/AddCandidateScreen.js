import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';

const AddCandidate = () => {
  const navigation = useNavigation();
  const handleAddCandidate = () => {

  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Add Candidate"} center={true}/>
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Full Name' />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Father Name' />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Contact' />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Permanent Address' />
        <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Local Address' />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCandidate}>
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
export default AddCandidate