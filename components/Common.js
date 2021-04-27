import React, {useContext} from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { fromScreen as styles } from '../styles/styles';
import { CloseCircleIconButton } from './CustomIcons';

import AppContext from '../context/PlanificadorAppContext';

export const clearButton = (func) => (
    Platform.OS == "android" ?
        <CloseCircleIconButton style={styles.clearButton} clear={func} />
        :
        <></>
)

export const onPressFav = async (changeFav, item, changeModal) => {
    const context = useContext(AppContext);
    try {
        const token = await SecureStore.getItemAsync('id_token');
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

export const onQuitFav = async (changeFav, item) => {
    const context = useContext(AppContext);
    try {
        const token = await SecureStore.getItemAsync('id_token');
        await context.deleteElementoFav(token, changeFav, item);
    } catch (err) {
        console.error(err);
        ToastAndroid.show('Erro quitando elemento como favorito', ToastAndroid.show);
    }
}