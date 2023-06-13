import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

import Box from "../../components/Compnents";

import { Alert, Keyboard, } from "react-native";

import {
    View,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { COLORS } from "../../colors";

export default function VoterScreen() {
    const [cnic, setCnic] = useState([]);
    const [newCnic, setNewCnic] = useState("");

    const addCnic = () => {
        if (newCnic.length == 0) {
            Alert.alert("Empty cnic", "Kindly enter the cnic");
            return;
        }
        setCnic([...cnic, newCnic]);
        setNewCnic("");
        Keyboard.dismiss();
    }

    const removeCnic = (c) => {
        setCnic(cnic.filter(cnics => cnics == c))
    }

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <FlatList
                    data={cnic}
                    keyExtractor={item => item.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Box item={item} handler={removeCnic} />
                    )}
                />
            </View>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="black"
                    autoCorrect={true}
                    value={newCnic}
                    placeholder="Enter voter cnic here"
                    maxLength={25}
                    onChangeText={text => setNewCnic(text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => addCnic()}>
                    <Ionicons name="ios-add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal:5
    },
    body: {
        flex: 1,

    },
    form: {
        padding: 0,
        height: 60,
        justifyContent: "center",
        alignSelf: "stretch",
        flexDirection: "row",
        paddingTop: 13,
        borderTopWidth: 1,
        borderColor: COLORS.main,
    },
    input: {
        paddingLeft: 12,
        backgroundColor: "white",
        color: "black",
        borderRadius: 6,
        flex: 1,
        height: 40,
        elevation:10
        },
    button: {
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.main,
        borderRadius: 4,
        marginLeft: 10
    },
});