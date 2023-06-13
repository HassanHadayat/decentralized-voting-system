import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import PollResult from '../../components/PollResult'
import TopNavBar from '../../components/TopNavBar'
import ScreenName from '../../components/ScreenName'
import ProgressBarClassic from 'react-native-progress-bar-classic/lib/ProgressBarClassic'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
const ResultsScreen = () => {
    const navigation = useNavigation();
    const candidateDetails={"Age":70,"Gender":"M","Father Name":"Ikramullah Khan","CNIC":"36502-5760200","Permanent Address":"p26-Add","Local Address":"l26-Add"}
    return (
        <ScrollView style={styles.container}>
            <StatusBar />
            <TopNavBar />
            <View style={styles.mainContainer}>
                <ScreenName heading={"Candidates"} center={false} />
                <TextInput style={styles.input} placeholder='Search for candidates' placeholderTextColor={'black'} />
                {/* All elections */}
                <View style={{ marginVertical: 20 }}>
                    <View style={styles.electionContainer}>
                        <TouchableOpacity style={styles.electionContainerHeader}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, }} >Imran Khan</Text>
                            <AntDesign name="up" size={20} color="black" />
                        </TouchableOpacity>
                        <View>
                        {Object.entries(candidateDetails).map(([key, value]) => (
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} key={key}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{key} : </Text>
            <Text style={{ fontSize: 16 }}>{value}</Text>
          </View>
        ))}
                        </View>
                    </View>
                    <View style={styles.electionContainer}>
                        <TouchableOpacity style={styles.electionContainerHeader}>
                            <Text style={{ fontWeight: 'bold', fontSize: 20, }} >Shabaz Sharif</Text>
                            <AntDesign name="down" size={20} color="black" />
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default ResultsScreen

const styles = StyleSheet.create({
    input: {
        minHeight: 50,
        // marginTop: 31,
        paddingLeft: 12,
        backgroundColor: "rgba(255,255,255,40)",
        color: "black",
        borderRadius: 6,
        elevation: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    mainContainer: {
        paddingHorizontal: 30,
        marginTop: 100
    },
    electionContainer: {
        borderBottomColor: 'black',
        // borderBottomWidth: 2,
        marginBottom: 20,
        borderTopWidth: 2,
        paddingVertical: 10,
    },
    electionContainerHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    electionBtn: {
        marginVertical: 5,
        color: "blue"
    }

})