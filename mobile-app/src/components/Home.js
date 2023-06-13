import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomeButton } from './Buttons'
import { useNavigation } from '@react-navigation/native'
import i from '../../assets/images/CastVote.png';
const Home = () => {
    const navigation=useNavigation();
    const marginVertical = 10;
    return (
        <View style={styles.btnContainer}>
            <HomeButton imgUrl={i} handlePress={() => navigation.navigate("Elections")} text={"Cast Vote"} />
            <HomeButton imgUrl={require("../../assets/images/ElectionResult2.png")} handlePress={() => navigation.navigate("Results")} text={"View Election Results"} />
            <HomeButton imgUrl={require("../../assets/images/ViewParties.png")} handlePress={() => navigation.navigate("ViewParties")} text={"View Parties"} />
            <HomeButton imgUrl={require("../../assets/images/ViewCandidates.png")} handlePress={() => navigation.navigate("ViewCanddates")} text={"View Candidates"} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    btnContainer: {
        flex: 1,
        flexDirection: 'column',
        // flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginTop:20
    },
})