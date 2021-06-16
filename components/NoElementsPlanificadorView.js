/**
 * @fileoverview Conxunto de botóns para engadir elementos á planificación cando esta está vacía
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// estilos
import { noElementsStyle as styles, customTouchableOpacity as styleButton } from '../styles/styles';

/**
 * Compoñente que conforma o conxunto de botóns que se amosan no planificador cando este está vacío
 * @returns {Component}
 */
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