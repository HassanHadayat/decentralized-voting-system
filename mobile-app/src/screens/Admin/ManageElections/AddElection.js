import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';
import Web3 from 'web3';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
const AddElection = () => {
    const { state: contracts, } = useEth();
    const [electionName, setElectionName] = useState("abc");
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [endDate, setEndDate] = useState();
    const [endTime, setEndTime] = useState();

    const navigation = useNavigation();
    const handle = async () => {
        try {
            // const unixStartTimeStamp = new Date(`${startDate}T${startTime}`).getTime() / 1000;
            // const unixEndTimeStamp = new Date(`${endDate}T${endTime}`).getTime() / 1000;
            const startDate = new Date().toISOString().split("T")[0];
            const startTime = new Date().toISOString().split("T")[1].slice(0, 5);
            const endDate = startDate;
            const endTime = startTime;

            const unixStartTimeStamp = new Date(`${startDate}T${startTime}`).getTime() / 1000;
            const unixEndTimeStamp = new Date(`${endDate}T${endTime}`).getTime() / 1000;


            console.log("Unix Start : ", unixStartTimeStamp);
            console.log("Unix End : ", unixEndTimeStamp);
            console.log(contracts.initialized[ContractName.ElectionManager].accounts[0]);
            await contracts.initialized[ContractName.ElectionManager].contract.methods
                .createGeneralElection(unixStartTimeStamp, unixEndTimeStamp, Web3Converter.strToBytes32(electionName))
                .send({ from: contracts.initialized[ContractName.ElectionManager].accounts[0], gas: "10000000" });
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavBar />
            <View style={styles.mainContainer}>
                <ScreenName heading={"Create General Election"} center={true} />
                <TextInput style={styles.input} placeholderTextColor={'black'} placeholder='Election Name' value={electionName} onChangeText={setElectionName} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handle}>
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
        marginTop: 30
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
export default AddElection