import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Checkbox from 'expo-checkbox';

const CastVoteItem = ({ item, checked, handler }) => {
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  const checkBoxChanged = () => {
    setChecked(true);
    handler(item.cnic);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={checkBoxChanged}
        color={isChecked ? '#4630EB' : undefined}
      />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
}

export default CastVoteItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 15
  },
  name: {
    margin: 8
  },
})
