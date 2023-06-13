import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react';

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from '../colors';

const ResultCandidate = ({ item}) => {


    return (
        <TouchableOpacity style={styles.ContainerView} onPress={()=>console.log("candidate profile")}>
            <Text style={styles.Texto}>{item}</Text>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                <MaterialCommunityIcons name="vote" size={24}/>
                <Text>12</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ResultCandidate;


const styles = StyleSheet.create({
    Texto: {
        fontSize: 14,
        color: "black",
        // fontWeight: "bold",
        // marginTop: 4,
        textAlign: "center"
    },
    ContainerView: {
        marginVertical: 8,

        marginHorizontal: 10,
        padding: 12,
        borderRadius: 4,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        elevation: 20
        // borderWidth: 1,
        // borderColor: "#eee"
    }
});