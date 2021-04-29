import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid, Platform } from 'react-native'

import { fromScreen as styles, customTouchableOpacity as button } from '../../../../styles/styles'
import { stylesTurismoList as progress } from '../../../../styles/styles';

import ProgressBar from '../../../../components/ProgressBar';
import { clearButton } from '../../../../components/Common';

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

    const registerUser = props.route.params.register;

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
        if (!checkName(user.nome)) {
            return {
                valid: false,
                message: 'O nome non é correcto'
            }
        }
        if (!checkName(user.apelidos)) {
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
            ToastAndroid.show(checked.message, ToastAndroid.SHORT);
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
                        placeholder="Email"
                        onChangeText={(value) => handleChangeText('email', value)}
                        placeholderTextColor="#808080"
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        clearButtonMode="always" />
                    {
                        clearButton(() => emailInput.clear())
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
                <View style={styles.inputGroup}>
                    <TextInput
                        ref={ref => confirmInput = ref}
                        style={styles.textInput}
                        placeholder="Repita o contrasinal"
                        onChangeText={(value) => handleChangeText('confirm_contrasinal', value)}
                        textContentType="password" secureTextEntry={true}
                        placeholderTextColor="#808080"
                        clearButtonMode="always" />
                    {
                        clearButton(() => confirmInput.clear())
                    }
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