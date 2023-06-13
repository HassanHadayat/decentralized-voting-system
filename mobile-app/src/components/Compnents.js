import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react';

import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from '../colors';

const Box = ({ item, handler }) => {
  const removeCnic = (item) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this?",
      [
        {
          text: "Cancel",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => handler(item)
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.ContainerView}>
      <Text style={styles.Texto}>{item}</Text>
      <TouchableOpacity onPress={removeCnic}>
        <MaterialIcons
          name="delete-forever"
          size={25}
          color={COLORS.main}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Box;


const styles = StyleSheet.create({
  Texto: {
    fontSize: 14,
    color: "black",
    // fontWeight: "bold",
    // marginTop: 4,
    textAlign: "center"
  },
  ContainerView: {
    marginTop: 10,
    padding: 15,
    borderRadius: 4,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation:20
    // borderWidth: 1,
    // borderColor: "#eee"
  }
});