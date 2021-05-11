import React, { useState, useEffect } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button, formSocial as styles, stylesTurismoList as stylesProgress } from '../../styles/styles'
import Stars from '../../components/CustomStarsSelection';
import { clearButton } from '../../components/Common';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import ProgressBar from '../../components/ProgressBar';

import TextArea from 'react-native-textarea';

import { newOpinion, editOpinion } from '../../model/Opinions/Opinions';

import { getToken, shouldDeleteToken } from '../../Util/TokenUtil';
import { checkTitle } from '../../Util/CheckFieldsUtil';

const NovoComentario = (props) => {

    const [comentario, setComentario] = useState({
        valoracion: 0,
        comentario: '',
        titulo: ''
    });

    const [modal, setModal] = useState({
        login: false,
        loading: false
    })

    useEffect(() => {
        let mounted = true;

        if (mounted && comment) {
            setComentario({
                valoracion: comment.valoracion,
                comentario: comment.comentario,
                titulo: comment.titulo
            });
        }

        return () => mounted = false;
    }, [])

    const showModal = () => {
        setModal({
            ...modal, login: !modal.login
        });
    }

    const element = props.route.params.element;
    const comment = props.route.params.comment;
    const titulo = props.route.params.titulo;
    const isPlanificacion = props.route.params.isPlanificacion;
    const onRefreshOpinions = props.route.params.onRefreshOpinions;
    const isHospedaxe = props.route.params.isHospedaxe;
    const isHostalaria = props.route.params.isHostalaria;

    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted) {
            props.navigation.setOptions({
                title: titulo
            });
        }

        return () => mounted = false;
    }, []);

    const updateValoracion = (valoracion) => {
        setComentario({
            ...comentario, ['valoracion']: valoracion
        })
    }

    const handleChangeText = (attr, value) => {
        setComentario({ ...comentario, [attr]: value })
    }

    const checkFields = () => {
        if (comentario.titulo == '') {
            return {
                valid: false,
                message: 'O campo título é obrigatorio'
            }
        }
        if (comentario.comentario == '') {
            return {
                valid: false,
                message: 'O campo comentario é obrigatorio'
            }
        }
        if (!checkTitle(comentario.titulo)) {
            return {
                valid: false,
                message: 'O título é demasiado longo'
            }
        }
        return {
            valid: true
        }
    }

    const sendOpinion = async () => {
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
            if (comment) {
                response = await editOpinion(token, comment.tipo, comment.id_elemento, comentario, comment.id);
            } else {
                response = await newOpinion(token, element.tipo, element.id, comentario);
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
            if (comment) {
                props.navigation.navigate("User");
            } else {
                if (isPlanificacion) {
                    props.navigation.navigate("RutasRecomendadasItem");
                } else if (isHospedaxe) {
                    props.navigation.navigate("HospedaxeItem");
                } else if (isHostalaria) {
                    props.navigation.navigate("HostalariaItem");
                } else {
                    props.navigation.navigate("TurismoItem");
                }
                onRefreshOpinions();
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no envío do comentario',
                type: "danger"
            });
        }
    }

    var tituloInput;

    return (
        modal.loading ?
            <View style={stylesProgress.container}>
                <ProgressBar />
            </View>
            :
            <ScrollView style={[scroll.scroll, formStyle.conatiner]} contentContainerStyle={scroll.containerScroll}>
                <View style={styles.containerInput}>
                    <Text style={{ fontSize: 20, fontStyle: "italic" }}>Valoración</Text>
                    <Stars valoracion={comentario.valoracion} updateValoracion={updateValoracion} />
                </View>
                <View style={formStyle.inputGroup}>
                    <TextInput
                        ref={ref => tituloInput = ref}
                        style={formStyle.textInput}
                        placeholder="Titulo"
                        onChangeText={(value) => handleChangeText('titulo', value)}
                        placeholderTextColor="#808080"
                        textContentType="name"
                        clearButtonMode="always"
                        multiline={true}
                        value={comentario.titulo}
                        numberOfLines={3} />
                    {
                        clearButton(() => tituloInput.clear())
                    }
                </View>
                <View style={formStyle.containerArea}>
                    <TextArea
                        onChangeText={(value) => handleChangeText('comentario', value)}
                        placeholder="Comentario"
                        containerStyle={formStyle.textareaContainer}
                        style={formStyle.textarea}
                        maxLength={250}
                        placeholderTextColor={'#808080'}
                        defaultValue={comentario.comentario}
                    />
                </View>
                <View style={formStyle.buttonViewContainer}>
                    <TouchableOpacity style={button.buttonContainer} onPress={() => sendOpinion()} >
                        <Text style={button.buttonTextSmaller}>Enviar comentario</Text>
                    </TouchableOpacity>
                </View>
                <ModalInicioSesion showModal={showModal} modal={modal.login} />
            </ScrollView>
    )

}

export default NovoComentario;