import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '../colors';



export default function RadioButton({ data, onSelect }) {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (cnic,party_add) => {
        onSelect(cnic,party_add);
        setUserOption(cnic);
    };
    return (
        <View style={styles.list}>
            {data.map((item,index) => {
                // console.log(item);
                return (
                    <View style={styles.item} key={index+item.cand_name}>
                        <View>
                            <Text style={styles.option}> {item.cand_name}</Text>
                            <Text style={styles.option}> {item.party_name}</Text>
                            <Text style={styles.option}> {item.party_alias}</Text>
                        </View>
                        <Pressable
                            onPress={() => selectHandler(item.candidate_cnic,item.party_add)}>
                            <MaterialIcons name={item.candidate_cnic === userOption ? "check-circle-outline" : "radio-button-unchecked"} size={24} color={COLORS.m
                            } style={{ marginHorizontal: 5 }} />
                        </Pressable>
                    </View>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    option: {
        fontSize: 15,
        color: 'black',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        minHeight: 40,
        marginTop: 10,
        backgroundColor: "white",
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 10,
        paddingHorizontal: 10
    },
})
