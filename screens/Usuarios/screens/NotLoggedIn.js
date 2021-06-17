/**
 * @fileoverview Pantalla de usuario sen iniciar sesión
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';

// estilos
import { notLoggedIn as styles, customTouchableOpacity as buttonStyle } from '../../../styles/styles';

// Util
import { getImageUri } from '../../../Util/ImageUtil';

// propiedades
import properties from '../../../properties/properties_expo'

/**
 * Compoñente que conforma a pantalla de usuario sen iniciar sesión
 * @param {Object} props 
 * @returns {Component}
 */
const NotLoggedIn = (props) => {

    const localUri = getImageUri("catedral_app");               // Localización da imaxe da catedral
    const register = props.register;                            // Función para rexistrar ao usuario
    const login = props.login;                                  // Función para iniciar sesión
    const navigation = useNavigation();                         // Navegación da aplicación

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: localUri }}
                style={styles.image}
                imageStyle={{ opacity: 1 }}>
                <Text style={styles.titleText}>FreshTour</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>A túa visita saudable a Santiago de Compostela</Text>
                </View>
            </ImageBackground>
            <View style={styles.bottom}>
                <TouchableOpacity style={buttonStyle.buttonContainer} onPress={() => navigation.navigate('Register', { register: register })}>
                    <Text style={buttonStyle.buttonText}>CREAR CONTA</Text>
                </TouchableOpacity>
                <Text style={styles.textBottom}>ou</Text>
                <View style={styles.rowTextBottom}>
                    <Text style={styles.textBottom}>Se xa estás rexistrado, </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login', { login: login })}>
                        <Text style={styles.textLogIn}>
                            Inicia sesión
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                justifyContent: "center",
                alignContent: "center",
                padding: 10
            }}>
                <View style={[styles.rowTextBottom, { flexWrap: "nowrap" }]}>
                    <Text style={{ fontSize: 12 }}>Revise a nosa </Text>
                    <Text style={styles.link} onPress={() => {
                        Linking.openURL(properties.legalidade.politica);
                    }}>Política de privacidade</Text>
                    <Text style={{ fontSize: 12 }}> e as nosas </Text>
                    <Text style={styles.link} onPress={() => {
                        Linking.openURL(properties.legalidade.condicions);
                    }}>Condicións de uso</Text>
                </View>
            </View>
        </View>
    );
}

export default NotLoggedIn;