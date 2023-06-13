

import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopNavBar from '../../components/TopNavBar';
import RadioButton from '../../components/RadioButton';
import { COLORS } from '../../colors';


const data = [
  { value: 'Apple' },
  { value: 'Samsung' },
  { value: 'Blackberry' },
];

const CastVote = () => {
  const [option, setOption] = useState(null);
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <Text style={{color:'black',fontSize:20}}>Select your candidate</Text>
        <RadioButton data={data} onSelect={(value) => setOption(value)}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Create poll")}>
            <Text style={{ color: 'white' }}>Cast Vote</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
export default CastVote;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 20,
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
});