import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import TopNavBar from '../../../components/TopNavBar';
import ScreenName from '../../../components/ScreenName';
import { COLORS } from '../../../colors';
import { useEth } from "../../../contexts/contexts";
import { ContractName } from "../../../contexts/EthContext/ContractName";
import Web3Converter from '../../../../utils/Web3Converter';
import DropDownPicker from 'react-native-dropdown-picker';
import Web3 from 'web3';
const RemovePoliticalPartyScreen = () => {
  const navigation = useNavigation();
  const { state: contracts, } = useEth();

  const [parties, setParties] = useState([]);// "Pakistan People's Party"
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    if (contracts.initialized && !isLoaded)
      loadParties();
  }, [contracts.initialized, isLoaded]);


  const loadParties = async () => {
    try {
      const dropdownItems = []
      const parties_names = await contracts.initialized[ContractName.PartyManager].contract.methods
        .getPartiesNames().call({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
      console.log(parties_names)
      for (let i = 0; i < parties_names.length; i++) {
        const name = Web3.utils.hexToUtf8(parties_names[i]);
        if (name) {
          dropdownItems.push({ label: name, value: name })
        }
      }
      console.log(dropdownItems);
      setParties(dropdownItems);
      setIsLoaded(true);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleRemoveParty = async () => {
    setIsLoaded(true);
    try {
      const resp = await contracts.initialized[ContractName.PartyManager].contract.methods
        .removeParty(Web3Converter.strToBytes32(value))
        .send({ from: contracts.initialized[ContractName.PartyManager].accounts[0] });
      console.log(resp);
    }
    catch (err) {
      console.log(err);
    }
    setValue(null);
    setIsLoaded(false);
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />
      <View style={styles.mainContainer}>
        <ScreenName heading={"Remove Party"} center={true} />
        <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80%' }}>
          {isLoaded &&
            <>
              <DropDownPicker
                open={open}
                value={value}
                setOpen={setOpen}
                setValue={setValue}
                items={parties}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleRemoveParty}>
                  <Text style={styles.text}>Remove</Text>
                </TouchableOpacity>
              </View>
            </>
          }
        </View>
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
    marginTop: 100,
    height: '80%',
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
    marginTop: 30,
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
export default RemovePoliticalPartyScreen