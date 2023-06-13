import { Text, TouchableOpacity, StyleSheet, Dimensions, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';

const Poll = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('CastVote')}>
            <Text style={{fontSize:18}}>Poll Name</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',marginTop:6,alignSelf:'flex-end' }}>
                <AntDesign name="clockcircle" size={24} color="black" />
                <Text style={{ marginLeft: 5 }}>2023-03-30</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Poll

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        height: 70,
        marginVertical: 4,
        justifyContent: 'center',
        backgroundColor: "white",
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 5,
        elevation: 10,
        paddingHorizontal: 10
    },
    item: {
        flexDirection: 'row'
    }, text: {
        color: 'black'
    }
})