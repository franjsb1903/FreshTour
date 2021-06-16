/**
 * @fileoverview Reúne compoñentes e funcións comúns a empregar entre os compoñentes da aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

// módulos
import React, {Component} from 'react';
import { Platform } from 'react-native';
import { showMessage } from "react-native-flash-message";

// modelo
import { sharePlanificacion } from '../model/Planificador/Planificador';

// estilos
import { fromScreen as styles } from '../styles/styles';

// compoñentes
import { CloseCircleIconButton } from './CustomIcons';

// Util
import { getToken, shouldDeleteToken } from '../Util/TokenUtil'

/**
 * Compoñente que conforma unha icona de cerrado
 * @param {Function} func 
 * @returns {Component}
 */
export const clearButton = (func) => (
    Platform.OS == "android" ?
        <CloseCircleIconButton style={styles.clearButton} clear={func} />
        :
        <></>
)

/**
 * Engade un elemento como favorito
 * @param {Function} changeFav 
 * @param {Object} item 
 * @param {Function} changeModal 
 * @param {Object} context 
 * @param {Function} model 
 */
export const onPressFav = async (changeFav, item, changeModal, context, model) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            changeModal();
        } else {
            await context.addElementoFav(token, changeFav, item, model, changeModal);
        }
    } catch (err) {
        console.error(err);
        showMessage({
            message: 'Erro engadindo elemento como favorito',
            type: "danger",
            position: "bottom",
            icon: "danger"
        });
    }
}

/**
 * Quita un elemento como favorito
 * @param {Function} changeFav 
 * @param {Object} item 
 * @param {Object} context 
 * @param {Function} model 
 */
export const onQuitFav = async (changeFav, item, context, model) => {
    try {
        const token = await getToken('id_token');
        await context.deleteElementoFav(token, changeFav, item, model);
    } catch (err) {
        console.error(err);
        showMessage({
            message: 'Erro quitando elemento como favorito',
            type: "danger",
            position: "bottom",
            icon: "danger"
        });
    }
}

/**
 * Comparte unha planificación
 * @param {Function} changeShared 
 * @param {Boolean} shared 
 * @param {Object} planificacion 
 */
export const onShare = async (changeShared, shared, planificacion) => {
    try {
        const token = await getToken('id_token');
        if (!token) {
            showMessage({
                message: 'Non se pode identificar ao usuario',
                type: "danger",
                position: "bottom",
                icon: "danger"
            });
            return;
        }
        const response = await sharePlanificacion(token, !shared, planificacion.id);
        if (response.status != 200) {
            if(!await shouldDeleteToken(response.message, 'id_token')) {
                showMessage({
                    message: response.message,
                    type: "danger",
                    position: "bottom",
                    icon: "danger"
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
            type: "danger",
            position: "bottom",
            icon: "danger"
        });
    }
}