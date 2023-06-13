import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import Poll from '../../components/Poll'
import TopNavBar from '../../components/TopNavBar'

const PollsScreen = () => {
  const data = [1, 2, 3,]
   //const data = null;
  const [poll, onPollChange] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      {data ? (
        <View style={styles.mainContainer}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              autoCorrect={true}
              value={poll}
              placeholder="Enter poll name to search"
              maxLength={25}
              onChangeText={text => onPollChange(poll)}
            />
          </View>
          <View style={styles.polls}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <Poll />
              )}
              keyExtractor={(item, index) => index}
            />
          </View>
        </View>) :
        <Text style={{color:'black',alignSelf:'center',}}> Polling Not Started Yet </Text>
      }
    </SafeAreaView>
  )
}

export default PollsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    justifyContent:'center'
  },
  mainContainer: {
    paddingHorizontal: 20,
    display:'flex',
    flex:1
  },
  form: {
    paddingTop: 25,
    paddingBottom: 12
  },
  input: {
    paddingLeft: 12,
    backgroundColor: "white",
    color: "black",
    borderRadius: 6,
    height: 40,
    elevation:10,
    
  },
  polls: {
    padding:10,
  }

})