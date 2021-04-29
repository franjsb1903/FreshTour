import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import TextArea from 'react-native-textarea';
import { showMessage } from "react-native-flash-message";

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button, stylesTurismoList as stylesProgress } from '../../../../styles/styles'
import { clearButton } from '../../../../components/Common';
import ModalInicioSesion from '../../../../components/ModalInicioSesion';
import AppContext from '../../../../context/PlanificadorAppContext';
import ProgressBar from '../../../../components/ProgressBar'

import { savePlanificacion, editPlanificacion } from '../../../../model/Planificador/Planificador';

import { getToken, shouldDeleteToken } from '../../../../Util/TokenUtil'
import { checkTitle } from '../../../../Util/CheckFieldsUtil';

const GardarPlanificacion = (props) => {

    const [planificacion, setPlanificacion] = useState({
        comentario: '',
        titulo: ''
    });

    const [modal, setModal] = useState({
        login: false,
        loading: false
    });

    const context = useContext(AppContext);

    const changeIsSaved = props.route.params.changeIsSaved;
    const data = props.route.params.data;
    const tempoVisita = props.route.params.tempoVisita;
    const edit = props.route.params.edit;
    const titulo = props.route.params.titulo;

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

    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted) {
            props.navigation.setOptions({
                title: titulo
            });
        }

        return () => mounted = false;
    }, []);

    const handleChangeText = (attr, value) => {
        setPlanificacion({ ...planificacion, [attr]: value })
    }

    const showModal = () => {
        setModal({
            ...modal, login: !modal.login
        });
    }

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

    const gardarPlanificacion = async () => {
        try {
            const checked = checkFields();
            if (!checked.valid) {
                showMessage({
                    message: checked.message,
                    type: "danger"
                });
                return;
            }
            const token = await getToken('id_token');
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
            if (!edit) {
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
                    message: 'Non se pode autenticar ao usuario',
                    type: "danger"
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
                        type: "danger"
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
            if (!edit) {
                changeIsSaved();
                showMessage({
                    message: 'Planificación almacenada correctamente',
                    type: "success"
                });
                context.updatePlanificacion(response.planificacion);
                props.navigation.navigate("Planificator");
            } else {
                props.navigation.navigate("User");
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no almacenamento da planificación',
                type: "success"
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