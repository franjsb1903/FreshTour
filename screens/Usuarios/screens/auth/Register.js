import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'

import { registerScreen as styles, customTouchableOpacity as button } from '../../../../styles/styles'

const Register = (props) => {

    const [state, setState] = useState({
        usuario: '',
        nome: '',
        apelidos: '',
        email: '',
        contrasinal: '',
        confirm_contrasinal: ''
    })

    const handleChangeText = (attr, value) => {
        setState({ ...state, [attr]: value })
    }

    return (
        <ScrollView style={styles.conatiner}>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} placeholder="Nome de usuario"
                    onChangeText={(value) => handleChangeText('usuario', value)} placeholderTextColor="#808080" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} placeholder="Nome"
                    onChangeText={(value) => handleChangeText('nome', value)} placeholderTextColor="#808080" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} placeholder="Apelidos"
                    onChangeText={(value) => handleChangeText('apelidos', value)} placeholderTextColor="#808080" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} style={styles.textInput} placeholder="Email"
                    onChangeText={(value) => handleChangeText('email', value)} placeholderTextColor="#808080" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} placeholder="Contrasinal"
                    onChangeText={(value) => handleChangeText('contrasinal', value)} textContentType="password" secureTextEntry={true} placeholderTextColor="#808080" />
            </View>
            <View style={styles.inputGroup}>
                <TextInput style={styles.textInput} placeholder="Repita o contrasinal"
                    onChangeText={(value) => handleChangeText('confirm_contrasinal', value)} textContentType="password" secureTextEntry={true} placeholderTextColor="#808080" />
            </View>
            <View style={styles.buttonViewContainer}>
                <TouchableOpacity style={button.buttonContainer}>
                    <Text style={button.buttonTextSmaller}>Crear conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Register;