
/**
 * @fileoverview Pantalla para gardar ou editar unha planificación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useContext, useEffect, Component } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import TextArea from 'react-native-textarea';
import { showMessage } from "react-native-flash-message";

// estilos
import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button, stylesTurismoList as stylesProgress } from '../../../../styles/styles'

// compoñentes
import { clearButton } from '../../../../components/Common';
import ModalInicioSesion from '../../../../components/ModalInicioSesion';
import ProgressBar from '../../../../components/ProgressBar';

// contexto
import AppContext from '../../../../context/AppContext';

// modelo
import { savePlanificacion, editPlanificacion } from '../../../../model/Planificador/Planificador';

// Util
import { getToken, shouldDeleteToken } from '../../../../Util/TokenUtil'
import { checkTitle } from '../../../../Util/CheckFieldsUtil';

/**
 * Compoñente que conforma a pantalla para gardar ou editar unha planificación
 * @param {Object} props 
 * @returns {Component}
 */
const GardarPlanificacion = (props) => {

    const [planificacion, setPlanificacion] = useState({                // Estado que garda os datos da planificación a almacenar
        comentario: '',
        titulo: ''
    });

    const [modal, setModal] = useState({                                // Estado que controla os modais de login e loading
        login: false,
        loading: false
    });

    const context = useContext(AppContext);                             // Constante que permite acceder ao contexto

    const changeIsSaved = props.route.params.changeIsSaved;             // Función que permite cambiar o estado da planificación
    const data = props.route.params.data;                               // Datos da planificación a editar
    const tempoVisita = props.route.params.tempoVisita;                 // Tempo de visita da planificación
    const edit = props.route.params.edit;                               // Boolean que indica se a operación é de edición
    const titulo = props.route.params.titulo;                           // Título da pantalla

    /**
     * Execútase o contido da función cando se monta o compoñente
     */
    useEffect(() => {
        let mounted = true;

        if (mounted && edit) {
            setPlanificacion({
                comentario: edit.comentario,
                titulo: edit.titulo
            });
        }

        return () => mounted = false;
    }, []);

    /**
     * Execútase o contido da función cando se monta o compoñente
     */
    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted) {
            props.navigation.setOptions({                                   // Establécense opcións de navegación
                title: titulo
            });
        }

        return () => mounted = false;
    }, []);

    /**
     * Actualiza a información introducida polo usuario nos campos
     * @param {String} attr 
     * @param {String} value 
     */
    const handleChangeText = (attr, value) => {
        setPlanificacion({ ...planificacion, [attr]: value })
    }

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal({
            ...modal, login: !modal.login
        });
    }

    /**
     * Chequea os campos introducidos polo usuario
     * @returns {Object}
     */
    const checkFields = () => {
        if (planificacion.titulo == '') {
            return {
                valid: false,
                message: 'O campo título é obrigatorio'
            }
        }
        if (planificacion.comentario == '') {
            return {
                valid: false,
                message: 'O campo comentario é obrigatorio'
            }
        }
        if (!checkTitle(planificacion.titulo)) {
            return {
                valid: false,
                message: 'O título é demasiado longo'
            }
        }
        return {
            valid: true
        }
    }

    /**
     * Garda a planificación
     * @returns 
     */
    const gardarPlanificacion = async () => {
        try {
            const checked = checkFields();                      // Chequeo de campos
            if (!checked.valid) {
                showMessage({
                    message: checked.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                return;
            }
            const token = await getToken('id_token');           // Recuperación do token de usuario
            if (!token) {
                setModal({
                    ...modal, ['login']: true
                });
                return;
            }
            setModal({
                ...modal, ['loading']: true
            });
            var response;
            if (!edit) {                                        // Preparación da nova planificación a almacenar
                planificacion['isShared'] = false;
                planificacion['distancia'] = data.features[0].properties.summary.distance;
                planificacion['tempoVisita'] = tempoVisita;
                planificacion['tempoRuta'] = data.features[0].properties.summary.duration;
                response = await savePlanificacion(token, planificacion, context.turismoItems);
            } else {
                response = await editPlanificacion(planificacion.titulo, planificacion.comentario, edit.id, token);
            }
            if (response.auth == false) {
                showMessage({
                    message: response.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
                });
                setModal({
                    ...modal, ['loading']: false
                });
                await shouldDeleteToken(response.message, 'id_token');
                return;
            }
            if (response.status != 200) {
                if (!await shouldDeleteToken(response.message, 'id_token')) {
                    showMessage({
                        message: response.message,
                        type: "danger",
                        position: "bottom",
                        icon: "danger"
                    });
                }
                setModal({
                    ...modal, ['loading']: false
                });
                return;
            }
            setModal({
                ...modal, ['loading']: false
            });
            if (!edit) {                                                // Redirección do usuario
                changeIsSaved();
                showMessage({
                    message: 'Planificación almacenada correctamente',
                    type: "success",
                    position: "bottom",
                    icon: "success"
                });
                context.updatePlanificacion(response.planificacion);    // Almacénase a planificación no contexto se esta é nova
                props.navigation.navigate("Planificator");
            } else {
                props.navigation.navigate("User");
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no almacenamento da planificación',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
        }
    }

    var tituloInputGardar;

    return (
        modal.loading ?
            <View style={stylesProgress.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={[scroll.scroll, formStyle.conatiner]} contentContainerStyle={scroll.containerScroll}>
                <View style={formStyle.inputGroup}>
                    <TextInput
                        ref={ref => tituloInputGardar = ref}
                        style={formStyle.textInput}
                        placeholder="Titulo"
                        onChangeText={(value) => handleChangeText('titulo', value)}
                        placeholderTextColor="#808080"
                        textContentType="name"
                        clearButtonMode="always"
                        multiline={true}
                        value={planificacion.titulo}
                        numberOfLines={3} />
                    {
                        clearButton(() => tituloInputGardar.clear())
                    }
                </View>
                <View style={formStyle.containerArea}>
                    <TextArea
                        onChangeText={(value) => handleChangeText('comentario', value)}
                        placeholder="Comentario"
                        containerStyle={formStyle.textareaContainer}
                        style={formStyle.textarea}
                        placeholderTextColor={'#808080'}
                        defaultValue={planificacion.comentario}
                    />
                </View>
                <View style={formStyle.buttonViewContainer}>
                    <TouchableOpacity style={button.buttonContainer} onPress={() => gardarPlanificacion()} >
                        <Text style={button.buttonTextSmaller}>Gardar planificacion</Text>
                    </TouchableOpacity>
                </View>
                <ModalInicioSesion showModal={showModal} modal={modal.login} />
            </ScrollView>
    )
}

export default GardarPlanificacion;