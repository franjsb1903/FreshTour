/**
 * @fileoverview Modelo dos lugares de hospedaxe
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// xestión de datos
import XestionDatosHospedaxe from '../../XestionDatos/XestionDatosHospedaxe';

const Hospedaxe = new XestionDatosHospedaxe();

/**
 * Obtén todos os lugares de hospedaxe da aplicación
 * @param {Boolean} signal 
 * @param {String} token 
 * @returns {Object}
 */
export const getAll = async (signal, token) => {
    try {
        const json = await Hospedaxe.getAll(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hospedaxe concreto
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const getConcreto = async (id, token) => {
    try {
        const json = await Hospedaxe.getConcreto(id, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hospedaxe por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getByName = async (token, name) => {
    try {
        const json = await Hospedaxe.getByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hospedaxe favorito por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getFavByName = async (token, name) => {
    try {
        const json = await Hospedaxe.getFavByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun lugar de hospedaxe
 * @param {Number} id 
 * @returns {String}
 */
export const getGeoElement = async (id) => {
    try {
        const data = await Hospedaxe.getGeoElement(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información de lugares de hospedaxe dun determinado tipo
 * @param {String} tag 
 * @param {String} secondTag 
 * @returns {String}
 */
export const getGeoByTag = async (tag, secondTag) => {
    try {
        const data = await Hospedaxe.getGeoByTag(tag, secondTag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun lugar de hospedaxe en formato JSON
 * @param {Number} id 
 * @returns {Object}
 */
export const getGeoElementJson = async (id) => {
    try {
        var json = await Hospedaxe.getGeoItemJson(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os lugares de hospedaxe filtrados e ordenados por unha determinada opción
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const filterSort = async (typeSort, token) => {
    try {
        const json = await Hospedaxe.filterSort(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os lugares de hospedaxe favoritos filtrados e ordenados por unha determinada opción
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const favFilterSort = async (typeSort, token) => {
    try {
        const json = await Hospedaxe.favFilterSort(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Engade un lugar de hospedaxe como favorito
 * @param {String} token 
 * @param {Number} id_lugar_hospedaxe 
 * @returns {Object}
 */
export const addFav = async (token, id_lugar_hospedaxe) => {
    try {
        const json = await Hospedaxe.addFav(token, id_lugar_hospedaxe);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita un lugar de hospedaxe como favorito
 * @param {String} token 
 * @param {Number} id_lugar_hospedaxe 
 * @returns {Object}
 */
export const quitFav = async (token, id_lugar_hospedaxe) => {
    try {
        const json = await Hospedaxe.quitFav(token, id_lugar_hospedaxe);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}