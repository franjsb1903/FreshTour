import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { noElementsStyle as styles, customTouchableOpacity as styleButton } from '../styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NoElementsPlanificadorView = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.noElementsContainer}>
            <Text style={styles.textNoElements}>Engada elementos á súa planificación!</Text>
            <View style={{ margin: 10, width: "100%" }}>
                <TouchableOpacity style={[styleButton.buttonContainer, { width: "100%" }]} onPress={() => {
                    navigation.navigate("Turism", {
                        updateItem: global.setSelected
                    });
                }}>
                    <Text style={styleButton.buttonText}>Puntos de interese</Text>
                </TouchableOpacity>
            </View>
            <View style={{ margin: 10, width: "100%" }}>
                <TouchableOpacity style={[styleButton.buttonContainer, { width: "100%" }]} onPress={() => {
                    navigation.navigate("HospedaxeList", {
                        updateItem: global.setSelected
                    });
                }}>
                    <Text style={styleButton.buttonText}>Hospedaxe</Text>
                </TouchableOpacity>
            </View>
            <View style={{ margin: 10, width: "100%" }}>
                <TouchableOpacity style={[styleButton.buttonContainer, { width: "100%" }]} onPress={() => {
                    navigation.navigate("LecerList", {
                        updateItem: global.setSelected
                    });
                }}>
                    <Text style={styleButton.buttonText}>Lecer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NoElementsPlanificadorView;