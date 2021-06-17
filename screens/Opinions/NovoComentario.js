/**
 * @fileoverview Pantalla para engadir ou editar un comentario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, useEffect, Component } from 'react';
import { ScrollView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { showMessage } from "react-native-flash-message";
import TextArea from 'react-native-textarea';

// estilos
import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button, formSocial as styles, stylesTurismoList as stylesProgress } from '../../styles/styles'

// compoñentes
import Stars from '../../components/CustomStarsSelection';
import { clearButton } from '../../components/Common';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import ProgressBar from '../../components/ProgressBar';

// modelo
import { newOpinion, editOpinion } from '../../model/Opinions/Opinions';

// Util
import { getToken, shouldDeleteToken } from '../../Util/TokenUtil';
import { checkTitle } from '../../Util/CheckFieldsUtil';

/**
 * Compoñente que conforma a pantalla para engadir ou editar un comentario
 * @param {Object} props 
 * @returns {Component}
 */
const NovoComentario = (props) => {

    const [comentario, setComentario] = useState({                  // Estado que reúne a información do comentario a engadir
        valoracion: 0,
        comentario: '',
        titulo: ''
    });

    const [modal, setModal] = useState({                            // Estado que controla a visualización dos modais
        login: false,
        loading: false
    })

    const element = props.route.params.element;                     // Obxecto que reúne a información do elemento
    const comment = props.route.params.comment;                     // Obxecto que reúne información dun comentario existente a editar
    const titulo = props.route.params.titulo;                       // Título da pantalla
    const isPlanificacion = props.route.params.isPlanificacion;     // Boolean que indica se se trata dunha planificación
    const onRefreshOpinions = props.route.params.onRefreshOpinions; // Función para refrescar as opinións do elemento
    const isHospedaxe = props.route.params.isHospedaxe;             // Boolean que indica se é un elemento de hospedaxe
    const isLecer = props.route.params.isLecer;                     // Boolean que indica se é un elemento de lecer

    /**
     * Execútase o contido da función cando se monta o compoñente
     */
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

    /**
     * Amosa ou oculta o modal
     */
    const showModal = () => {
        setModal({
            ...modal, login: !modal.login
        });
    }

    /**
     * Execútase o contido da función cando se constrúe o compoñente
     */
    React.useLayoutEffect(() => {
        let mounted = true;

        if (mounted) {
            props.navigation.setOptions({                       // Fíxanse opcións de navegación
                title: titulo
            });
        }

        return () => mounted = false;
    }, []);

    /**
     * Actualiza o valor da valoración indicada polo usuario
     * @param {Number} valoracion 
     */
    const updateValoracion = (valoracion) => {
        setComentario({
            ...comentario, ['valoracion']: valoracion
        })
    }

    /**
     * Actualiza o valor dos campos introducidos polo usuario
     * @param {String} attr 
     * @param {String} value 
     */
    const handleChangeText = (attr, value) => {
        setComentario({ ...comentario, [attr]: value })
    }

    /**
     * Chequea os campos a cubrir polo usuario antes de enviar a información ao servidor
     * @returns {Object}
     */
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

    /**
     * Envía a información ao servidor
     * @returns 
     */
    const sendOpinion = async () => {
        try {
            const checked = checkFields();                      // Chequeo de campos
            if (!checked.valid) {
                showMessage({
                    message: checked.message,
                    type: "warning",
                    position: "bottom",
                    icon: "warning"
                });
                return;
            }
            const token = await getToken('id_token');           // Obtención do token de usuario
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
            if (comment) {                                      // En función de se é edición ou adición
                response = await editOpinion(token, comment.tipo, comment.id_elemento, comentario, comment.id);
            } else {
                response = await newOpinion(token, element.tipo, element.id, comentario);
            }
            if (response.auth == false) {
                showMessage({
                    message: 'Non se pode autenticar ao usuario',
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
                        icon: "danger",
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
            showMessage({
                message: 'Pode revisar os seus comentarios no seu perfil',
                type: "info",
                position: "bottom",
                icon: "info"
            });
            if (comment) {                                          // Redirección do usuario a outra pantalla
                props.navigation.navigate("User");
            } else {
                if (isPlanificacion) {
                    props.navigation.navigate("RutasRecomendadasItem");
                } else if (isHospedaxe) {
                    props.navigation.navigate("HospedaxeItem");
                } else if (isLecer) {
                    props.navigation.navigate("CommonLecerItem");
                } else {
                    props.navigation.navigate("TurismoItem");
                }
                onRefreshOpinions();
            }
        } catch (err) {
            console.error(err);
            showMessage({
                message: 'Erro no envío do comentario',
                type: "danger",
                position: "bottom",
                icon: "danger"
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