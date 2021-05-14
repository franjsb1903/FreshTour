import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { modal as modalStyle } from '../styles/styles';

const ModalConfirmacion = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;
    const confirm = props.confirm;
    const text = props.text;

    return (

        <View style={modalStyle.centeredView}>
            <Modal
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                isVisible={modal}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                backdropOpacity={0.7}
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