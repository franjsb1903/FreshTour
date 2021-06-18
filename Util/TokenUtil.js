/**
 * @fileoverview Funcións relacionadas co token de usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

// módulos
import * as SecureStore from 'expo-secure-store';

/**
 * Obtén o token
 * @param {String} id 
 * @returns {String}
 */
export const getToken = async (id) => {
    try {
        const token = await SecureStore.getItemAsync(id);
        return token;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Determina se é necesario eliminar o token
 * @param {String} message 
 * @param {String} id 
 * @returns {Boolean}
 */
export const shouldDeleteToken = async (message, id) => {
    try {
        if (message === "jwt expired") {
            await SecureStore.deleteItemAsync(id);
            return true;
        }
        return false;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Almacena o token
 * @param {String} id 
 * @param {String} token 
 */
export const storeToken = async (id, token) => {
    try {
        await SecureStore.setItemAsync(id, token);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Elimina o token
 * @param {String} id 
 */
export const deleteToken = async (id) => {
    try {
        await SecureStore.deleteItemAsync(id);
    } catch (err) {
        throw new Error(err);
    }
}