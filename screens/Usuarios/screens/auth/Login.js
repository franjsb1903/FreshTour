import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'

import { fromScreen as styles, customTouchableOpacity as button } from '../../../../styles/styles'
import { stylesTurismoList as progress } from '../../../../styles/styles';

import ProgressBar from '../../../../components/ProgressBar';
import { clearButton } from '../../../../components/Common';

import { checkUsername, checkEmail } from '../../../../Util/CheckFieldsUtil'
import {showMessage} from "react-native-flash-message";

const Register = (props) => {

    const [user, setUser] = useState({
        usuario: '',
        contrasinal: ''
    });

    const [loading, setLoading] = useState(false);
    const loginUser = props.route.params.login;

    const handleChangeText = (attr, value) => {
        setUser({ ...user, [attr]: value })
    }

    const checkFields = () => {
        if (user.usuario == '') {
            return {
                valid: false,
                message: 'O campo de usuario é obrigatorio'
            }
        }
        if (user.contrasinal == '') {
            return {
                valid: false,
                message: 'O campo de contrasinal é obrigatorio'
            }
        }
        if (user.usuario.split('@').length > 1) {
            if (!checkEmail(user.usuario)) {
                return {
                    valid: false,
                    message: 'O email non é correcto'
                }
            }
        } else {
            if (!checkUsername(user.usuario)) {
                return {
                    valid: false,
                    message: 'O nome de usuario non é correcto'
                }
            }
        }
        return {
            valid: true
        }
    }

    const login = async () => {
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
        const nav = await loginUser({
            usuario: user.usuario,
            contrasinal: user.contrasinal
        });
        setLoading(false);
        if (nav) {
            props.navigation.navigate('User');
        } else {
            setUser({
                usuario: '',
                contrasinal: ''
            });
        }
    }

    var usuarioInput, contrasinalInput;

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
                        placeholder="Nome de usuario"
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
                        ref={ref => contrasinalInput = ref}
                        style={styles.textInput}
                        placeholder="Contrasinal"
                        onChangeText={(value) => handleChangeText('contrasinal', value)}
                        textContentType="password"
                        secureTextEntry={true}
                        placeholderTextColor="#808080"
                        clearButtonMode="always" />
                    {
                        clearButton(() => contrasinalInput.clear())
                    }
                </View>
                <View style={styles.buttonViewContainer} >
                    <TouchableOpacity style={button.buttonContainer} onPress={() => {
                        login();
                    }}>
                        <Text style={button.buttonTextSmaller}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
    )
}

export default Register;