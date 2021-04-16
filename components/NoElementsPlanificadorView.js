import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { stylesPlanificadorScreens as styles, customTouchableOpacity as styleButton } from '../styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NoElementsPlanificadorView = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.noElementsContainer}>
            <Text style={styles.textNoElements}>Engada elementos á súa planificación!</Text>
            <TouchableOpacity style={styleButton.buttonContainer} onPress={() => {
                navigation.navigate("Turism",{
                    updateItem: global.setSelected
                });
            }}>
                <Text style={styleButton.buttonText}>Engadir elementos</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoElementsPlanificadorView;