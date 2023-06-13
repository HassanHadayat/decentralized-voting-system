import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { ElectionButton } from '../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../components/TopNavBar';
import Admin from '../components/Admin';
import Home from '../components/Home';
import ScreenName from '../components/ScreenName';

// import { HomeButton } from '../components/Buttons'

const ElectionsScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Elections"} center={false}/>
      <View style={styles.btnContainer}>
            <ElectionButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} heading1={"NA-1"} heading2={"General Elections 2023"}/>
            <ElectionButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} heading1={"PP-1"} heading2={"General Elections 2023"}/>
            <ElectionButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} heading1={"PS-59"} heading2={"Provincial Elections 2023"}/>
            <ElectionButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} heading1={"NA-127"} heading2={"Constitency Elections 2023"}/>
        </View>
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
    marginTop: 100
  },
      btnContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop:20
    },
});
export default ElectionsScreen

// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { HomeButton } from '../components/Buttons'
// import { useNavigation } from '@react-navigation/native'

// const ElectionsScreen = () => {
//     const navigation=useNavigation();
//     const marginVertical = 10;
//     return (
//         <View style={styles.btnContainer}>
//             <HomeButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} text={"Cast Vote"} />
//             <HomeButton imgUrl={require("../../assets/icons/results-icon.png")} handlePress={() => navigation.navigate("Results")} text={"View Election Results"} />
//             <HomeButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} text={"View Parties"} />
//             <HomeButton imgUrl={require("../../assets/icons/results-icon.png")} handlePress={() => navigation.navigate("Results")} text={"View Candidates"} />
            
//         </View>
//     )
// }

// export default ElectionsScreen

// const styles = StyleSheet.create({
//     btnContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         alignItems: 'flex-start',
//         justifyContent: 'space-between',
//         marginTop:20
//     },
// })