import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity, ToastAndroid } from 'react-native';

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button } from '../../styles/styles'
import Stars from '../../components/CustomStarsSelection';
import { clearButton } from '../../components/Common';
import ModalLoading from '../../components/ModalLoading';
import ModalInicioSesion from '../../components/ModalInicioSesion';
import TextArea from 'react-native-textarea';

import * as SecureStore from 'expo-secure-store';
import { newOpinion } from '../../model/Opinions/Opinions';

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

    const showModal = () => {
        setModal({
            ...modal, login: !modal.login
        });
    }


    const element = props.route.params.element;
    const updateOpinions = props.route.params.updateOpinions;

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: `${element.titulo}`
        });
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
            const data = await newOpinion(token, element.tipo, element.id, comentario);
            if (data.auth == false) {
                ToastAndroid.show('Non se pode autenticar ao usuario', ToastAndroid.SHORT);
                setModal({
                    ...modal, ['loading']: false
                });
                return;
            }
            if (data.status != 200) {
                ToastAndroid.show('Erro no envío do comentario', ToastAndroid.SHORT);
                setModal({
                    ...modal, ['loading']: false
                });
                return;
            }
            updateOpinions(data.comment, data.valoracion, data.status);
            setModal({
                ...modal, ['loading']: false
            });
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
                    numberOfLines={3} />
                {
                    clearButton(() => tituloInput.clear())
                }
            </View>
            <View style={formStyle.containerArea}>
                <TextArea
                    ref={ref => comentarioInput = ref}
                    onChangeText={(value) => handleChangeText('comentario', value)}
                    placeholder="Comentario"
                    containerStyle={formStyle.textareaContainer}
                    style={formStyle.textarea}
                    maxLength={250}
                    placeholderTextColor={'#808080'}
                />
            </View>
            <View style={formStyle.buttonViewContainer}>
                <TouchableOpacity style={button.buttonContainer} onPress={() => sendOpinion()} >
                    <Text style={button.buttonTextSmaller}>Enviar comentario</Text>
                </TouchableOpacity>
            </View>
            <ModalInicioSesion showModal={showModal} />
            <ModalLoading />
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