import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../colors'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const TopNavBar = ({showLogout}) => {
  const navigation = useNavigation();
  // console.log(showLogout);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      // console.log('Data removed successfully.');
      navigation.navigate("Start");
    } catch (error) {
      // console.log('Error while removing data:', error);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={require('../../assets/logo.png')} style={{ height: 50, width: 50, marginHorizontal: 10 }} />
        <Text style={{ color: 'black', fontSize: 18 }}>Decentralized Voting System</Text>

      </View>
      <View style={{ marginRight: 10 }}>
        {showLogout == undefined &&
          <TouchableOpacity onPress={logout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>}

      </View>
    </SafeAreaView>
  )
}

export default TopNavBar

const styles = StyleSheet.create({
  container: {
    top: 0,
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: COLORS.white,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    elevation: 5,
    justifyContent: 'space-between',
  }
})