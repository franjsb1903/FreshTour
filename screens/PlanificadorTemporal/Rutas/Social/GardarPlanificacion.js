import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import TextArea from 'react-native-textarea';

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button, stylesTurismoList as stylesProgress } from '../../../../styles/styles'
import { clearButton } from '../../../../components/Common';
import ModalInicioSesion from '../../../../components/ModalInicioSesion';
import AppContext from '../../../../context/PlanificadorAppContext';
import ProgressBar from '../../../../components/ProgressBar'

import { savePlanificacion, editPlanificacion } from '../../../../model/Planificador/Planificador';

import * as SecureStore from 'expo-secure-store';

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

    const gardarPlanificacion = async () => {
        try {
            const token = await SecureStore.getItemAsync('id_token');
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
                ToastAndroid.show('Non se pode autenticar ao usuario', ToastAndroid.SHORT);
                setModal({
                    ...modal, ['loading']: false
                });
                return;
            }
            if (response.status != 200) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
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
                ToastAndroid.show('Planificación almacenada correctamente', ToastAndroid.SHORT);
                props.navigation.navigate("Planificator");
            } else {
                props.navigation.navigate("User");
            }
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no almacenamento da planificación', ToastAndroid.SHORT);
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