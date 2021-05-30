import React from 'react';
import { Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import * as Linking from 'expo-linking';

import { notLoggedIn as styles, customTouchableOpacity as buttonStyle } from '../../../styles/styles';
import { getImageUri } from '../../../Util/ImageUtil';

import { useNavigation } from '@react-navigation/native';
import properties from '../../../properties/properties_expo'

const NotLoggedIn = (props) => {

    const localUri = getImageUri("catedral_app");
    const register = props.register;
    const login = props.login;
    const navigation = useNavigation();

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