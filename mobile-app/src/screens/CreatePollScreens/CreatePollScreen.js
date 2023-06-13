import {
  Platform,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import VoterScreen from "./AddVoterScreen";
import CandidateScreen from "./AddCandidateScreen";
import TopNavBar from "../../components/TopNavBar";
import { COLORS } from "../../colors";

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar />
      <TopNavBar />

      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior="padding"
        style={styles.mainContainer}
        enabled={Platform.OS === "ios"}
      >

        <View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholderTextColor="black"
              autoCorrect={true}
              placeholder="Enter poll name here"
              maxLength={25}
            />
          </View>
        </View>
        <View style={{ backgroundColor: 'blue', flex: 1 }}>
          <Tab.Navigator screenOptions={
            {
              tabBarStyle: { backgroundColor: COLORS.main },
              tabBarLabelStyle:{color:'white'}
            }
          }>
            <Tab.Screen name='Candidates' component={CandidateScreen} />
            <Tab.Screen name='Voters' component={VoterScreen} />
          </Tab.Navigator>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("Create poll")}>
            <Text style={{ color: 'white' }}>Create Poll</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50
  },
  mainContainer: {
    display: 'flex',
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingVertical: 30,
    flex: 1
  },
  form: {
    padding: 0,
    height: 60,
    justifyContent: "center",
    alignSelf: "stretch",
    flexDirection: "row",
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

  buttonContainer: {
    marginTop: 15,
    marginBottom: 25,
  },
  button: {
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: COLORS.main,
    color:"black"
  },
});