import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesPlanificadorScreens as styles } from '../styles/styles';

const NoElementsPlanificadorView = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.noElementsContainer}>
            <Text style={styles.textNoElements}>Engada elementos á súa planificación!</Text>
            <Button title="Engadir elementos" color="#2e8b57" onPress={() => navigation.navigate("Turism",{
                updateItem: global.setSelected
            })} />
        </View>
    )
}

export default NoElementsPlanificadorView;