import React from 'react';
import { Platform } from 'react-native';
import { sharePlanificacion } from '../model/Planificador/Planificador';
import { fromScreen as styles } from '../styles/styles';
import { CloseCircleIconButton } from './CustomIcons';
import { showMessage } from "react-native-flash-message";

import { getToken, shouldDeleteToken } from '../Util/TokenUtil'

export const clearButton = (func) => (
    Platform.OS == "android" ?
        <CloseCircleIconButton style={styles.clearButton} clear={func} />
        :
        <></>
)

export const onPressFav = async (changeFav, item, changeModal, context, model) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            changeModal();
        } else {
            await context.addElementoFav(token, changeFav, item, model);
        }
    } catch (err) {
        console.error(err);
        showMessage({
            message: 'Erro engadindo elemento como favorito',
            type: "danger"
        });
    }
}

export const onQuitFav = async (changeFav, item, context, model) => {
    try {
        const token = await getToken('id_token');
        await context.deleteElementoFav(token, changeFav, item, model);
    } catch (err) {
        console.error(err);
        showMessage({
            message: 'Erro quitando elemento como favorito',
            type: "danger"
        });
    }
}

export const onShare = async (changeShared, shared, planificacion) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            showMessage({
                message: 'Non se pode identificar ao usuario',
                type: "danger"
            });
            return;
        }
        const response = await sharePlanificacion(token, !shared, planificacion.id);
        if (response.status != 200) {
            if(!await shouldDeleteToken(response.message, 'id_token')) {
                showMessage({
                    message: response.message,
                    type: "danger"
                });
                return;
            }
        }
        else {
            changeShared();
        }
    } catch (err) {
        console.error(err);
        showMessage({
            message: 'Erro na acción, tenteo de novo',
            type: "danger"
        });
    }
}