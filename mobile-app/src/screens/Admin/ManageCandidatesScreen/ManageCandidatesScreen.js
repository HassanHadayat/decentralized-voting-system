import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { HomeButton } from '../../../components/Buttons';

const ManageCandidatesScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Manage Candidates"} center={false} />
        <View style={styles.btnContainer}>
          <HomeButton imgUrl={require("../../../../assets/icons/create-poll-icon.png")} handlePress={() => navigation.navigate("AddCandidate")} text={"Add Candidate"}/>
          <HomeButton imgUrl={require("../../../../assets/icons/create-poll-icon.png")} handlePress={() => navigation.navigate("AddCandidates")} text={"Add list of Candidates"}/>
          <HomeButton imgUrl={require("../../../../assets/icons/create-poll-icon.png")} handlePress={() => navigation.navigate("RemoveCandidate")} text={"Remove Candidate"}/>
          <HomeButton imgUrl={require("../../../../assets/icons/create-poll-icon.png")} handlePress={() => navigation.navigate("RemoveCandidates")} text={"Remove list of Candidates"}/>
        </View>
      </View>

    </ScrollView>
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
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent:'space-between'
  },
});
export default ManageCandidatesScreen