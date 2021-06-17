/**
 * @fileoverview Modelo dos Monumentos e Lugares Turísticos
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// xestion de datos
const XestionDatosTurismo = require('../../XestionDatos/XestionDatosTurismo')

const Turismo = new XestionDatosTurismo();

/**
 * Obtén todos os monumentos e lugares turísticos da aplicación
 * @param {String} token 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getData = async (token, signal) => {
    try {
        var data = await Turismo.getTurismData(token, signal);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar turístico concreto
 * @param {String} token 
 * @param {Number} id 
 * @returns {Object}
 */
export const getLugar = async (token, id) => {
    try {
        var json = await Turismo.getLugar(token, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un monumento concreto
 * @param {String} token 
 * @param {Number} id 
 * @returns {Object}
 */
export const getMonumento = async (token, id) => {
    try {
        var json = await Turismo.getMonumento(token, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén monumentos e lugares turísticos por nome
 * @param {String} name 
 * @param {String} token 
 * @returns {Object}
 */
export const getElement = async (name, token) => {
    try {
        var json = await Turismo.getElementData(name, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun determinado elemento turístico
 * @param {Number} id 
 * @param {String} tipo 
 * @returns {String}
 */
export const getGeoElement = async (id, tipo) => {
    try {
        var data = await Turismo.getGeoItem(id, tipo);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén a información xeográfica de todos os monumentos ou de todos os lugares turísticos
 * @param {String} tipo 
 * @returns {String}
 */
export const getGeoAll = async (tipo) => {
    try {
        var data = await Turismo.getGeoAll(tipo);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén a información xeográfica dun elemento turístico en formato JSON
 * @param {Number} id 
 * @param {String} tipo 
 * @returns 
 */
export const getGeoElementJson = async (id, tipo) => {
    try {
        var json = await Turismo.getGeoItemJson(id, tipo);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os elementos turísticos ordenados dun determinado modo
 * @param {String} type 
 * @param {String} token 
 * @returns {Object}
 */
export const sortBy = async (type, token) => {
    try {
        var json = await Turismo.sortBy(type, token);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Obtén os elementos turísticos favoritos ordenados dun determinado modo
 * @param {String} type 
 * @param {String} token 
 * @returns {Object}
 */
export const favsSortBy = async (type, token) => {
    try {
        var json = await Turismo.favsSortBy(type, token);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Engade un elemento turístico como favorito
 * @param {String} token 
 * @param {Number} id_elemento 
 * @param {String} type 
 * @returns {Object}
 */
export const addElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Turismo.addElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita un elemento turístico como favorito
 * @param {String} token 
 * @param {Number} id_elemento 
 * @param {String} type 
 * @returns {Object}
 */
export const deleteElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Turismo.deleteElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un elemento favorito por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getElementFavByName = async (token, name) => {
    try {
        const json = await Turismo.getElementFavByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}