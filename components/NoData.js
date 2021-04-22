import React from 'react';
import { View, Text } from 'react-native'

const NoData = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 20 }}>Non hai elementos que mostrar</Text>
        </View>
    )
}

export default NoData;