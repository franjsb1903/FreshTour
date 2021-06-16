/**
 * @fileoverview Modal para establecer tempos de visita flexibles
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, { useState, Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';

// estilos
import { modal as modalStyle, fromScreen as form } from '../styles/styles';

/**
 * Compoñente que conforma o modal para establecer tempos de visita flexibles
 * @param {Object} props 
 * @returns {Component}
 */
const ModalTempo = (props) => {

    const modal = props.modal;                              // Boolean que indica se o modal se debe de amosar ou non
    const showModal = props.showModal;                      // Función para cambiar o estado de visualización do modal
    const _onCorrect = props._onCorrect;                    // Función que se executa cando se confirma a operación

    const [tempo, setTempo] = useState(0);                  // Estado que almacena o tempo introducido polo usuario

    /**
     * Actualiza o número introducido polo usuario
     * @param {String} value 
     */
    const handleChangeText = (value) => {
        setTempo(value);
    }

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
                    <View style={[modalStyle.modalView, { flexDirection: "column" }]}>
                        <Text style={modalStyle.modalText}>Indique o tempo en minutos que quere adicar a este elemento</Text>
                        <View style={[form.inputGroup, { flex: 0, marginBottom: 30, padding: 10 }]}>
                            <TextInput
                                style={form.textInput}
                                placeholder="Tempo en minutos"
                                onChangeText={(value) => handleChangeText(value)}
                                placeholderTextColor="#808080"
                                keyboardType="numeric"
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