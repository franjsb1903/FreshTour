import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button } from '../../styles/styles'
import Stars from '../../components/CustomStarsSelection';
import { clearButton } from '../../components/Common';
import ModalLoading from '../../components/ModalLoading';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import TextArea from 'react-native-textarea';

import * as SecureStore from 'expo-secure-store';
import { newOpinion, editOpinion } from '../../model/Opinions/Opinions';

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

    const sendOpinion = async () => {
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
            var data;
            if (comment) {
                data = await editOpinion(token, comment.tipo, comment.id_elemento, comentario, comment.id);
            } else {
                data = await newOpinion(token, element.tipo, element.id, comentario);
            }
            if (data.auth == false) {
                ToastAndroid.show('Non se pode autenticar ao usuario', ToastAndroid.SHORT);
                setModal({
                    ...modal, ['loading']: false
                });
                return;
            }
            if (data.status != 200) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
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
                props.navigation.navigate("TurismoItem");
            }
        } catch (err) {
            console.error(err);
            ToastAndroid.show('Erro no envío do comentario', ToastAndroid.SHORT);
        }
    }

    return (
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
                {
                    <TouchableOpacity style={button.buttonContainer} onPress={() => sendOpinion()} >
                        <Text style={button.buttonTextSmaller}>Enviar comentario</Text>
                    </TouchableOpacity>
                }

            </View>
            <ModalInicioSesion showModal={showModal} modal={modal.login} />
            <ModalLoading modal={modal.loading} />
        </ScrollView>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center"
    },
    containerInput: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default NovoComentario;