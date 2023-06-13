import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { politicsImg } from '../../assets/images/images'
import { COLORS } from '../colors'
import TopNavBar from '../components/TopNavBar'

import AsyncStorage from '@react-native-async-storage/async-storage';
const StartScreen = () => {
    
    const navigation = useNavigation();
    const retrieveUserData = async () => {
        try {
            const data = await AsyncStorage.getItem("user");
            if (data) {
                const user = JSON.parse(data);
                console.log('User data:', user);
                navigation.navigate("Home");
                
            }
        } catch (err) {
            console.log("error ",err);
        }
    };
    useEffect(() => {
        retrieveUserData();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar />
            <TopNavBar showLogout={true}/>
            <View style={{ backgroundColor: COLORS.main, marginTop: 100 }}>
                <Image source={politicsImg} style={{ width: 250, height: 350, alignSelf: 'center' }} resizeMode="contain" />
            </View>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.main }]} onPress={() => navigation.navigate("SignIn")}>
                        <Text style={{ color: "white" }}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'white', borderColor: COLORS.main, borderWidth: 2 }]} onPress={() => navigation.navigate("SignUp")}>
                        <Text>REGISTER</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
    },
    buttonContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 15
    },
    button: {
        minWidth: '60%',
        minHeight: 40,
        backgroundColor: '#37c1fe',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    text: {
        color: 'white'
    }
});
export default StartScreen