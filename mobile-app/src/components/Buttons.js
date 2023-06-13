import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Svg } from 'react-native-svg'

export const HomeButton = ({ imgUrl, handlePress, text, ...props }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 6,
                display: 'flex',
                borderColor: 'black',
                borderWidth: 1,
                width: '100%',
                marginBottom: 20,
                height: 120,
                justifyContent: 'center'

            }}
            onPress={handlePress}>
            <Image
                source={imgUrl}
                resizeMode="contain"
                style={{ height: 40 }} />
            <Text style={{ color: '#311649', marginTop: 12, fontSize: 15 }}>{text}</Text>
        </TouchableOpacity>
    )
}

export const ElectionButton = ({ imgUrl, electionName, electionAdd, electionConstituency, constituencyAdd }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 6,
                display: 'flex',
                borderColor: 'black',
                borderWidth: 1,
                width: '45%',
                marginBottom: 20,
                height: 150,
                justifyContent: 'center'

            }}
            onPress={() => navigation.navigate("SubmitVote", { selectedPoll: { electionName, electionAdd, "pollName": electionConstituency, constituencyAdd } })}>
            <Text style={{ color: '#311649', marginTop: 12, fontSize: 15, fontWeight: 'bold' }}>{electionConstituency}</Text>
            <Image
                source={imgUrl}
                resizeMode="contain"
                style={{ height: 40, marginVertical: 5 }} />
            <Text style={{ color: '#311649', marginTop: 12, fontSize: 15 }}>{electionName}</Text>
        </TouchableOpacity>
    )
}