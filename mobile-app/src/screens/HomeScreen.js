import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { HomeButton } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../components/TopNavBar';
import Admin from '../components/Admin';
import Home from '../components/Home';

const HomeScreen = () => {
  // const navigation = useNavigation();
  
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        {/* TODO Needed May be */}
        {/* <Admin /> */}
        <Home />
      </View>

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  mainContainer: {
    paddingHorizontal: 40,
    marginTop: 80
  },
});
export default HomeScreen