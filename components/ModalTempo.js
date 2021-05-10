import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';

import { modal as modalStyle, fromScreen as form } from '../styles/styles';

const ModalTempo = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;
    const _onCorrect = props._onCorrect;

    const [tempo, setTempo] = useState(0);

    const handleChangeText = (value) => {
        setTempo(value);
    }

    return (

        <View style={modalStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    showModal(!modal);
                }}
            >
                <View style={modalStyle.centeredView}>
                    <View style={[modalStyle.modalView, { flexDirection: "column" }]}>
                        <Text style={modalStyle.modalText}>Indique o tempo en minutos que quere adicar a este elemento</Text>
                        <View style={[form.inputGroup, { flex: 0, marginBottom: 30, padding: 10 }]}>
                            <TextInput
                                style={form.textInput}
                                placeholder="Tempo en minutos"
                                onChangeText={(value) => handleChangeText(value)}
                                placeholderTextColor="#808080"
                                textContentType="none"
                                clearButtonMode="always" />
                        </View>
                        <View style={modalStyle.rowButton}>
                            <TouchableOpacity
                                style={[modalStyle.button, modalStyle.buttonClose]}
                                onPress={() => showModal(!modal)}
                            >
                                <Text style={modalStyle.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalStyle.button, modalStyle.buttonOk]}
                                onPress={() => {
                                    _onCorrect(tempo);
                                    showModal(!modal)
                                }}
                            >
                                <Text style={modalStyle.textStyle}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalTempo;