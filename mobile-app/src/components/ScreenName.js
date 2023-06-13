import { Text } from 'react-native'
import React from 'react'

const ScreenName = ({ heading, center }) => {
    return (
        <Text style={{ borderBottomColor: 'black', borderBottomWidth: 2, alignItems: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 20, paddingBottom: 10, textAlign:center? 'center' : null }}>{heading}</Text>
    )
}

export default ScreenName
