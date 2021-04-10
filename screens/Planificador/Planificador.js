import React from 'react';
import { View, Text, Button } from 'react-native';

const Planificator = (props) => {
    return (
        <View>
            <Text>
                Son a pantalla de planifciación!
            </Text>
            <Button title="Press me" onPress={() => props.navigation.navigate('Turism')} />
        </View>
    )
}

export default Planificator;