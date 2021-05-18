import React from 'react';
import { View, Text } from 'react-native'

const NoData = () => {
    return (
        <View style={{ justifyContent: "center", alignItems: "center", padding: 50 }}>
            <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
        </View>
    )
}

export default NoData;