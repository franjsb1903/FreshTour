import React, { useState } from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { modal as modalStyle } from '../styles/styles';

const ModalInicioSesion = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;
    const navigation = useNavigation();

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
                    <View style={modalStyle.modalView}>
                        <Text style={modalStyle.modalText}>Inicie sesión en primeiro lugar</Text>
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
                                    navigation.navigate('User');
                                    showModal(!modal)
                                }}
                            >
                                <Text style={modalStyle.textStyle}>Iniciar sesión</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalInicioSesion;