// adb reverse tcp:8545 tcp:8545   
// import './global';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from './src/screens/StartScreen';
// Authentication Screns
import SignInScreen from './src/screens/AuthenticationScreens/SignInScreen';
import SignUpScreen from './src/screens/AuthenticationScreens/SignUpScreen';
import OtpScreen from './src/screens/AuthenticationScreens/OtpScreen';
// import OtpScreen from './src/screens/AuthenticationScreens/OtpScreen';
// Home Screen
import HomeScreen from './src/screens/HomeScreen';
// Voter Screen
// Cast Vote Screen
import ElectionsScreen from './src/screens/Voter/ElectionScreen/ElectionsScreen';
import SubmitVoteScreen from './src/screens/Voter/ElectionScreen/SubmitVoteScreen';
// View Candidate Screen
import ViewCandidateScreen from './src/screens/Voter/ViewCandidateScreen/ViewCandidatesScreen';
// View Party Screen
import ViewPartyScreen from './src/screens/Voter/ViewPartyScreen/ViewPartyScreen';
// Restuls Screen
import ResultsScreen from './src/screens/Voter/ResultsScreen/ResultsScreen';
import PollResultsScreen from './src/screens/Voter/ResultsScreen/PollResultsScreen';
// Admin
// Manage Elections
import AddElection from './src/screens/Admin/ManageElections/AddElection';
// Manage Political Parties Screen
import ManagePoliticalPartiesScreen from './src/screens/Admin/ManagePoliticalPartiesScreen/ManagePoliticalPartiesScreen';
import AddPoliticalPartyScreen from './src/screens/Admin/ManagePoliticalPartiesScreen/AddPoliticalPartyScreen';
import RemovePoliticalPartyScreen from './src/screens/Admin/ManagePoliticalPartiesScreen/RemovePoliticalPartyScreen';


import EthProvider from './src/contexts/EthContext/EthProvider';
const Stack = createNativeStackNavigator();

{/* <Stack.Screen name="Otp" component={OtpScreen} />  */ }
export default function App() {
  return (
    <EthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}>
          
          <Stack.Screen name="Start" component={StartScreen} />
          
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="Elections" component={ElectionsScreen} />
          <Stack.Screen name="Otp" component={OtpScreen} />
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="PollResult" component={PollResultsScreen} />

          {/* <Stack.Screen name="RemovePoliticalPartyScreen" component={RemovePoliticalPartyScreen} /> */}

          {/* Authentication Screens */}
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          {/* Home Screen */}
          {/* Voter Screens */}
          {/* Cast Vote Screen */}
          <Stack.Screen name="SubmitVote" component={SubmitVoteScreen} />
          {/* View Candidates Screen */}
          <Stack.Screen name="ViewCanddates" component={ViewCandidateScreen} />
          {/* View Parties Screen */}
          <Stack.Screen name="ViewParties" component={ViewPartyScreen} />
          {/* Results Screen */}
          
          {/* Admin Screen */}
          {/* <Stack.Screen name="AddElection" component={AddElection} /> */}

          <Stack.Screen name="ManagePoliticalPartiesScreen" component={ManagePoliticalPartiesScreen} />
          <Stack.Screen name="AddPoliticalPartyScreen" component={AddPoliticalPartyScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </EthProvider>
  );
}



// Admin Screen
// Candidates Screen
// import ManageCandidatesScreen from './src/screens/Admin/ManageCandidatesScreen/ManageCandidatesScreen';
// import AddCandidateScreen from './src/screens/Admin/ManageCandidatesScreen/AddCandidateScreen';
// import AddCandidatesScreen from './src/screens/Admin/ManageCandidatesScreen/AddCandidatesScreen';
// import RemoveCandidateScreen from './src/screens/Admin/ManageCandidatesScreen/RemoveCandidateScreen';
// import RemoveCandidatesScreen from './src/screens/Admin/ManageCandidatesScreen/RemoveCandidatesScreen';



{/* Admin Screens */ }
{/* <Stack.Screen name="ManageCandidates" component={ManageCandidatesScreen} /> */ }
{/* <Stack.Screen name="AddCandidate" component={AddCandidateScreen} /> */ }
{/* <Stack.Screen name="AddCandidates" component={AddCandidatesScreen} /> */ }
{/* <Stack.Screen name="RemoveCandidate" component={RemoveCandidateScreen} /> */ }
{/* <Stack.Screen name="RemoveCandidates" component={RemoveCandidatesScreen} /> */ }
{/* Manage Political Parties Screen */ }

