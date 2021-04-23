import React from 'react'
import { View, Modal } from 'react-native';

import { modal as modalStyle, stylesTurismoList as styles } from '../styles/styles';
import ProgressBar from './ProgressBar';

const ModalInicioSesion = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;

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
                <View style={styles.container}>
                    <ProgressBar />
                </View>
            </Modal>
        </View>
    )
}

export default ModalInicioSesion;