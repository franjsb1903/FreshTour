/**
 * @fileoverview Modal de inicio de sesión
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react'
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

// estilos
import { modal as modalStyle } from '../styles/styles';

/**
 * Compoñente que conforma o modal de inicio de sesión
 * @param {Object} props 
 * @returns {Component}
 */
const ModalInicioSesion = (props) => {

    const modal = props.modal;                          // Boolean que indica se o modal se debe de amosar ou non
    const showModal = props.showModal;                  // Función para cambiar o estado de visualización do modal
    const navigation = useNavigation();                 // Constante para empregar a navegación da aplicación

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