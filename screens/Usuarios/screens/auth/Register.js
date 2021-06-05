import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'

import { fromScreen as styles, customTouchableOpacity as button } from '../../../../styles/styles'
import { stylesTurismoList as progress } from '../../../../styles/styles';
import * as Linking from 'expo-linking';

import ProgressBar from '../../../../components/ProgressBar';
import { clearButton } from '../../../../components/Common';
import { showMessage } from "react-native-flash-message";
import CheckBox from '@react-native-community/checkbox';
import properties from '../../../../properties/properties_expo'

import { checkEmail, checkName, checkUsername } from '../../../../Util/CheckFieldsUtil';

const Register = (props) => {

    const [user, setUser] = useState({
        usuario: '',
        nome: '',
        apelidos: '',
        email: '',
        contrasinal: '',
        confirm_contrasinal: ''
    });

    const [loading, setLoading] = useState(false);

    const [legalCheckBox, setlegalCheckBox] = useState(false)

    const registerUser = props.route.params.register;

    const handleChangeText = (attr, value) => {
        setUser({ ...user, [attr]: value })
    }

    const checkFields = () => {
        if(!legalCheckBox){
            return {
                valid: false,
                message: 'Ten que aceptar a Política de Privacidade e Condicións de uso'
            }
        }
        if (user.usuario == '') {
            return {
                valid: false,
                message: 'O campo de usuario é obrigatorio'
            }
        }
        if (user.email == '') {
            return {
                valid: false,
                message: 'O campo de email é obrigatorio'
            }
        }
        if (user.contrasinal == '') {
            return {
                valid: false,
                message: 'O campo de contrasinal é obrigatorio'
            }
        }
        if (user.confirm_contrasinal == '') {
            return {
                valid: false,
                message: 'Por favor, confirme o contrasinal'
            }
        }
        if (user.contrasinal != user.confirm_contrasinal) {
            return {
                valid: false,
                message: 'Os contrasinais non coinciden'
            }
        }
        if (user.contrasinal.length < 8) {
            return {
                valid: false,
                message: 'O contrasinal debe ter un tamaño mínimo de 8 caracteres'
            }
        }
        if (!checkEmail(user.email)) {
            return {
                valid: false,
                message: 'O email non é correcto'
            }
        }
        if (!checkUsername(user.usuario)) {
            return {
                valid: false,
                message: 'Nome de usuario inválido (demasiado longo, contén espacios ou contén caractéres raros)'
            }
        }
        if (user.nome != '' && !checkName(user.nome)) {
            return {
                valid: false,
                message: 'O nome non é correcto'
            }
        }
        if (user.apelidos != '' && !checkName(user.apelidos)) {
            return {
                valid: false,
                message: 'Os apelidos non son correctos'
            }
        }
        return {
            valid: true
        }
    }

    const register = async () => {
        setLoading(true);
        const checked = checkFields();
        if (!checked.valid) {
            showMessage({
                message: checked.message,
                type: "warning",
                position: "bottom",
                icon: "warning"
            });
            setLoading(false);
            return;
        }
        const nav = await registerUser({
            usuario: user.usuario,
            nome: user.nome,
            apelidos: user.apelidos,
            email: user.email,
            contrasinal: user.contrasinal
        });
        setLoading(false);
        if (nav) {
            props.navigation.navigate('User');
        } else {
            setUser({
                usuario: '',
                nome: '',
                apelidos: '',
                email: '',
                contrasinal: ''
            })
        }
    }

    var usuarioInput, nomeInput, apelidosInput, emailInput, contrasinalInput, confirmInput;

    return (
        loading ?
            <View style={progress.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={styles.conatiner}>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => usuarioInput = ref}
                        style={styles.textInput}
                        placeholder="Nome de usuario*"
                        onChangeText={(value) => handleChangeText('usuario', value)}
                        placeholderTextColor="#808080"
                        textContentType="username"
                        clearButtonMode="always" />
                    {
                        clearButton(() => usuarioInput.clear())
                    }
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => nomeInput = ref}
                        style={styles.textInput}
                        placeholder="Nome"
                        onChangeText={(value) => handleChangeText('nome', value)}
                        placeholderTextColor="#808080"
                        textContentType="name"
                        clearButtonMode="always" />
                    {
                        clearButton(() => nomeInput.clear())
                    }
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => apelidosInput = ref}
                        style={styles.textInput}
                        placeholder="Apelidos"
                        onChangeText={(value) => handleChangeText('apelidos', value)}
                        placeholderTextColor="#808080"
                        textContentType="name"
                        clearButtonMode="always" />
                    {
                        clearButton(() => apelidosInput.clear())
                    }
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => emailInput = ref}
                        style={styles.textInput}
                        style={styles.textInput}
                        placeholder="Email*"
                        onChangeText={(value) => handleChangeText('email', value)}
                        placeholderTextColor="#808080"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        clearButtonMode="always"
                    />
                    {
                        clearButton(() => emailInput.clear())
                    }
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => contrasinalInput = ref}
                        style={styles.textInput}
                        placeholder="Contrasinal*"
                        onChangeText={(value) => handleChangeText('contrasinal', value)}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholderTextColor="#808080"
                        clearButtonMode="always" />
                    {
                        clearButton(() => contrasinalInput.clear())
                    }
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => confirmInput = ref}
                        style={styles.textInput}
                        placeholder="Repita o contrasinal*"
                        onChangeText={(value) => handleChangeText('confirm_contrasinal', value)}
                        textContentType="password" secureTextEntry={true}
                        placeholderTextColor="#808080"
                        clearButtonMode="always" />
                    {
                        clearButton(() => confirmInput.clear())
                    }
                </View>
                <View style={styles.legal}>
                    <CheckBox
                        disabled={false}
                        value={legalCheckBox}
                        onValueChange={(newValue) => setlegalCheckBox(newValue)}
                        style={{margin: 0}}
                    />
                    <View style={{ flex: 0, flexWrap: "nowrap", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <Text style={{ fontSize: 12 }}>Acepto a </Text>
                        <Text style={styles.link} onPress={() => {
                            Linking.openURL(properties.legalidade.politica);
                        }}>Política de privacidade</Text>
                        <Text style={{ fontSize: 12 }}> e </Text>
                        <Text style={styles.link} onPress={() => {
                            Linking.openURL(properties.legalidade.condicions);
                        }}>Condicións de uso</Text>
                    </View>
                </View>
                <View style={styles.buttonViewContainer}>
                    <TouchableOpacity style={button.buttonContainer} onPress={() => {
                        register();
                    }}>
                        <Text style={button.buttonTextSmaller}>Crear conta</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    )
}

export default Register;