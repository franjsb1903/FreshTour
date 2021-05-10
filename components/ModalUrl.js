import React, { useState, useEffect } from 'react'
import { Text, View, Modal, TouchableOpacity, TextInput } from 'react-native';

import { modal as modalStyle } from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ModalUrl = (props) => {

    const modal = props.modal;
    const showModal = props.showModal;

    const [text, setText] = useState({
        url: '',
        geoserver: ''
    });

    const handleChangeText = (attr, value) => {
        setText({...text, [attr]: value});
    }

    useEffect(() => {
        let mounted = true;

        const getUrl = async () => {
            if (mounted) {
                const urlAsync = await AsyncStorage.getItem('url');
                const geoserverAsync = await AsyncStorage.getItem('geoserver');
                if (urlAsync && geoserverAsync) {
                    setText({
                        url: urlAsync,
                        geoserver: geoserverAsync
                    })
                }
            }
        }

        getUrl();

        return () => mounted = false;
    }, []);

    return (

        <View style={[modalStyle.centeredView, {flex: 0}]}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                    showModal(!modal);
                }}
            >
                <View style={modalStyle.centeredView}>
                    <View style={[modalStyle.modalView, { flexDirection: "column" }]}>
                        <TextInput
                            placeholder="URL"
                            style={{ borderWidth: 1, borderColor: "darkgreen", padding: 20, margin: 10 }}
                            onChangeText={(value) => handleChangeText('url', value)}
                            textContentType="URL"
                            placeholderTextColor="#808080"
                            defaultValue={text.url} />
                        <TextInput
                            placeholder="Geoserver"
                            onChangeText={(value) => handleChangeText('geoserver', value)}
                            style={{ borderWidth: 1, borderColor: "darkgreen", padding: 20, margin: 10 }}
                            textContentType="URL"
                            placeholderTextColor="#808080"
                            defaultValue={text.geoserver} />
                        <View style={modalStyle.rowButton}>
                            <TouchableOpacity
                                style={[modalStyle.button, modalStyle.buttonOk]}
                                onPress={() => {
                                    AsyncStorage.setItem('url', text.url);
                                    AsyncStorage.setItem('geoserver', text.geoserver)
                                    showModal(!modal)
                                }}
                            >
                                <Text style={modalStyle.textStyle}>Gardar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default ModalUrl;