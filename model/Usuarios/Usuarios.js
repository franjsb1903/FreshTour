/**
 * @fileoverview Modelo dos Usuarios
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do contexto
*/

// xestion de datos
import XestionDatosUsuarios from '../../XestionDatos/XestionDatosUsuarios';

const Usuarios = new XestionDatosUsuarios();

/**
 * Rexistra un usuario na plataforma
 * @param {Object} user 
 * @returns {Object}
 */
export const registerUser = async (user) => {

    try {
        const json = await Usuarios.registerUser(user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Permite o inicio de sesión dun usuario na plataforma
 * @param {Object} user 
 * @returns {Object}
 */
export const loginUser = async (user) => {
    try {
        const json = await Usuarios.loginUser(user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Inicio de sesión dun usuario a través do seu token
 * @param {String} token 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getUserByToken = async (token, signal) => {
    try {
        const json = await Usuarios.getUserByToken(token, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Permite a edición dun usuario
 * @param {String} token 
 * @param {Object} user 
 * @returns {Object}
 */
export const editUser = async (token, user) => {
    try {
        const json = await Usuarios.editUser(token, user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Eliminación da conta dun usuario
 * @param {String} token 
 * @returns {Object}
 */
export const deleteUser = async (token) => {
    try {
        const json = await Usuarios.deleteUser(token);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}