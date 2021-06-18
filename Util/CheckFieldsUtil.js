/**
 * @fileoverview Funcións para validar campos
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

/**
 * Valida un nome de usuario
 * @param {String} username 
 * @returns {Boolean}
 */
export const checkUsername = (username) => {
    const usernameRegex = new RegExp(/^[a-zA-Z0-9_ñÑÀ-ÿ]+$/);
    const valid = username.length <= 50 && usernameRegex.test(username);
    return valid;
}

/**
 * Valida un nome ou apelido
 * @param {String} name 
 * @returns {Boolean}
 */
export const checkName = (name) => {
    const nameRegex = new RegExp(/^[a-z ,.'-ñÑÀ-ÿ]+$/i);
    return nameRegex.test(name);
}

/**
 * Valida un email
 * @param {String} email 
 * @returns {Boolean}
 */
export const checkEmail = (email) => {
    const emailRegex = new RegExp(/^[a-z0-9_.]+@[a-z]+(.com|.es)/i);
    return emailRegex.test(email);
}

/**
 * Valida un título
 * @param {String} title 
 * @returns {Boolean}
 */
export const checkTitle = (title) => {
    return title.length <= 50;
}