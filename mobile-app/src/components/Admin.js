import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomeButton } from './Buttons'
import { useNavigation } from '@react-navigation/native'
import ScreenName from './ScreenName'

const Admin = () => {
    const navigation = useNavigation();
    return (
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, paddingVertical: 20 }}>
            <ScreenName heading={"Admin"} center={false} />
            <View style={styles.btnContainer}>
                {/* <HomeButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("Polls")} text={"Manage Elections"} /> */}
                {/* <HomeButton imgUrl={require("../../assets/icons/results-icon.png")} handlePress={() => navigation.navigate("ManagerVoters")} text={"Manage Voters"} /> */}
                {/* <HomeButton imgUrl={require("../../assets/icons/ballot-box-icon-3.png")} handlePress={() => navigation.navigate("ManageCandidates")} text={"Manage Candidates"} /> */}
                <HomeButton imgUrl={require("../../assets/icons/results-icon.png")} handlePress={() => navigation.navigate("ManagePoliticalPartiesScreen")} text={"Manage Political Parties"} />
            </View>
        </View >
    )
}

export default Admin

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent:'space-between'
      },
})