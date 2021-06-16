/**
 * @fileoverview Modal de confirmación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

// estilos
import { modal as modalStyle } from '../styles/styles';

/**
 * Compoñente que conforma o modal de confirmación
 * @param {Object} props 
 * @returns {Component}
 */
const ModalConfirmacion = (props) => {

    const modal = props.modal;                          // Boolean que indica se o modal se ten que amosar ou non
    const showModal = props.showModal;                  // Función para cambiar o estado de visualización do modal
    const confirm = props.confirm;                      // Función a executar cando se confirma
    const text = props.text;                            // Texto a amosar

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