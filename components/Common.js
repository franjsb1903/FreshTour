import React from 'react';
import { Platform, ToastAndroid } from 'react-native';
import { sharePlanificacion } from '../model/Planificador/Planificador';
import { fromScreen as styles } from '../styles/styles';
import { CloseCircleIconButton } from './CustomIcons';

import { getToken, shouldDeleteToken } from '../Util/TokenUtil'

export const clearButton = (func) => (
    Platform.OS == "android" ?
        <CloseCircleIconButton style={styles.clearButton} clear={func} />
        :
        <></>
)

export const onPressFav = async (changeFav, item, changeModal, context) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            changeModal();
        } else {
            await context.addElementoFav(token, changeFav, item);
        }
    } catch (err) {
        console.error(err);
        ToastAndroid.show('Erro engadindo elemento como favorito', ToastAndroid.show);
    }
}

export const onQuitFav = async (changeFav, item, context) => {
    try {
        const token = await getToken('id_token');
        await context.deleteElementoFav(token, changeFav, item);
    } catch (err) {
        console.error(err);
        ToastAndroid.show('Erro quitando elemento como favorito', ToastAndroid.show);
    }
}

export const onShare = async (changeShared, shared, planificacion) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            ToastAndroid.show('Non se pode identificar ao usuario', ToastAndroid.SHORT);
            return;
        }
        const response = await sharePlanificacion(token, !shared, planificacion.id);
        if (response.status != 200) {
            if(!await shouldDeleteToken(response.message, 'id_token')) {
                ToastAndroid.show(data.message, ToastAndroid.SHORT);
                return;
            }
        }
        else {
            changeShared();
        }
    } catch (err) {
        console.error(err);
        if (Platform.OS == "android") {
            ToastAndroid.show('Erro na acción, tenteo de novo', ToastAndroid.SHORT);
        } else {
            Alert.alert('Erro na acción, tenteo de novo');
        }
    }
}