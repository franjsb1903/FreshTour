/**
 * @fileoverview Pantalla de edición de información de usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useContext, useEffect, Component } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { showMessage } from "react-native-flash-message";

// estilos
import { fromScreen as styles, customTouchableOpacity as button } from '../../../styles/styles'
import { stylesTurismoList as progress } from '../../../styles/styles';

// compoñentes
import ProgressBar from '../../../components/ProgressBar';
import { clearButton } from '../../../components/Common';
import ModalConfirmacion from '../../../components/ModalConfirmacion';

// modelo
import { editUser, deleteUser } from '../../../model/Usuarios/Usuarios';

// Util
import { getToken, shouldDeleteToken, deleteToken } from '../../../Util/TokenUtil';
import { checkEmail, checkName, checkUsername } from '../../../Util/CheckFieldsUtil';

// contexto
import AppContext from '../../../context/AppContext';

/**
 * Compoñente que conforma a pantalla de edición de información de usuario
 * @param {Object} props 
 * @returns {Component}
 */
const Editar = (props) => {

    const [user, setUser] = useState({                              // Estado que almacena a información do usuario
        usuario: '',
        nome: '',
        apelidos: '',
        email: '',
        contrasinal: '',
        confirm_contrasinal: ''
    });

    const [loading, setLoading] = useState(false);                  // Estado que indica cando a pantalla está cargando contido
    const [confirmacion, setConfirmacion] = useState(false);        // Estado que controla un modal

    const usuario = props.route.params.user;                        // Obxecto que almacena a información do usuario a editar

    /**
     * Execútase cando se monta o compoñente
     */
    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setUser({
                usuario: usuario.usuario,
                nome: usuario.nome,
                apelidos: usuario.apelidos,
                email: usuario.email,
                contrasinal: '',
                confirm_contrasinal: ''
            });
        }

        return () => mounted = false;
    }, []);

    /**
     * Amosa ou oculta o modal
     */
    const showConfirmacion = () => {
        setConfirmacion(!confirmacion);
    }

    const context = useContext(AppContext);                         // Constante para empregar o contexto

    /**
     * Actualiza a información introducida polo usuario no estado
     * @param {String} attr 
     * @param {String} value 
     */
    const handleChangeText = (attr, value) => {
        setUser({ ...user, [attr]: value })
    }

    /**
     * Chequea os campos introducidos polo usuario
     * @returns {Object}
     */
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

    /**
     * Almacena a nova información do usuario no servidor
     * @returns 
     */
    const edit = async () => {
        try {
            setLoading(true);
            const checked = checkFields();                      // Chequea os campos
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
            const editedUser = {
                usuario: user.usuario,
                nome: user.nome,
                apelidos: user.apelidos,
                email: user.email,
                contrasinal: user.contrasinal
            }
            const token = await getToken('id_token');           // Obtén o token de usuario
            if (!token) {
                showMessage({
                    message: 'Non se pode autenticar ao usuario',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                setLoading(false);
                return
            }
            const response = await editUser(token, editedUser); // Confirma a edición
            if (response.auth == false || response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                    setLoading(false);
                    setUser({
                        ...user, contrasinal: '', confirm_contrasinal: ''
                    })
                    return
                }
            }
            context.setUser(response);                          // Almacena o usuario no contexto
            setLoading(false);
            props.navigation.navigate('User');
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro na edición, tenteo de novo',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    /**
     * Elimina unha conta de usuario cando o usuario así o solicita
     * @returns 
     */
    const onDelete = async () => {
        try {
            setLoading(true);
            const token = await getToken('id_token');               // Obtén o token de usuario
            if (!token) {
                showMessage({
                    message: 'Non se pode autenticar ao usuario',
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                setLoading(false);
                return
            }
            const response = await deleteUser(token);               // Executa a operación
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                    setUser({
                        ...user, contrasinal: '', confirm_contrasinal: ''
                    })
                    return
                }
                setLoading(false);
                return;
            }
            await deleteToken('id_token');                          // Elimina o token de usuario
            context.resetUser();                                    // Borra o usuario do contexto
            setLoading(false);
            props.navigation.navigate('User');
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro na edición, tenteo de novo',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
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
                        clearButtonMode="always"
                        defaultValue={user.usuario} />
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
                        clearButtonMode="always"
                        defaultValue={user.nome} />
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
                        clearButtonMode="always"
                        defaultValue={user.apelidos} />
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
                        clearButtonMode="always"
                        defaultValue={user.email} />
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
                        textContentType="password"
                        secureTextEntry={true}
                        placeholderTextColor="#808080"
                        clearButtonMode="always" />
                    {
                        clearButton(() => confirmInput.clear())
                    }
                </View>
                <View style={styles.buttonViewContainer}>
                    <TouchableOpacity style={button.buttonContainer} onPress={() => {
                        edit();
                    }}>
                        <Text style={button.buttonTextSmaller}>Editar conta</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonViewContainer}>
                    <TouchableOpacity style={[button.buttonContainer, { backgroundColor: "red" }]} onPress={() => {
                        showConfirmacion();
                    }}>
                        <Text style={button.buttonTextSmaller}>Eliminar conta</Text>
                    </TouchableOpacity>
                </View>
                <ModalConfirmacion modal={confirmacion} showModal={showConfirmacion} confirm={onDelete} text={"Está a punto de borrar a súa conta de maneira permanente. Ao borrar a conta, eliminaranse todos os datos que estean ligados a ela. Está seguro?"} />
            </ScrollView>
    )
}

export default Editar;