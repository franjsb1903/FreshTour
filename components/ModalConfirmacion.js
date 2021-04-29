import React from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native';

import { modal as modalStyle } from '../styles/styles';

const ModalConfirmacion = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;
    const confirm = props.confirm;
    const text = props.text;

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
                        <Text style={modalStyle.modalText}>{text}</Text>
                        <View style={modalStyle.rowButton}>
                            <TouchableOpacity
                                style={[modalStyle.button, { backgroundColor: "red" }]}
                                onPress={() => showModal(!modal)}
                            >
                                <Text style={modalStyle.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalStyle.button, modalStyle.buttonOk]}
                                onPress={() => {
                                    confirm();
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

export default ModalConfirmacion;