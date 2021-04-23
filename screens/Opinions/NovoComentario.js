import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'

import { stylesScroll as scroll, fromScreen as formStyle, customTouchableOpacity as button } from '../../styles/styles'
import Stars from '../../components/CustomStarsSelection';
import { clearButton } from '../../components/Common';
import TextArea from 'react-native-textarea'

const NovoComentario = (props) => {

    const [comentario, setComentario] = useState({
        valoracion: 0,
        comentario: '',
        titulo: ''
    });

    const element = props.route.params.element;

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
                <TouchableOpacity style={button.buttonContainer} >
                    <Text style={button.buttonTextSmaller}>Enviar comentario</Text>
                </TouchableOpacity>
            </View>
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