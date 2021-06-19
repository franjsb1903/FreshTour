/**
 * @fileoverview Modelo do Planificador coas funcionalidades asociadas ao planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// properties
import properties from '../../properties/properties_expo';

// xestión de datos
const XestionDatosPlanificador = require('../../XestionDatos/XestionDatosPlanificador')

const Planificador = new XestionDatosPlanificador();

/**
 * Obtén unha determinada ruta a partir das coordenadas
 * @param {Array} coordinates 
 * @param {Boolean} walking 
 * @returns {Object}
 */
export const getRoute = (coordinates, walking) => {
    return new Promise((resolve, reject) => {

        const urlWalk = properties.routes.url + properties.routes.walk_profile + properties.routes.format;
        const urlCycle = properties.routes.url + properties.routes.clycling_profile + properties.routes.format;

        try {
            let request = new XMLHttpRequest();

            var url;

            if (walking) {
                url = urlWalk;
            } else {
                url = urlCycle;
            }

            request.open('POST', url);

            request.setRequestHeader('Accept', 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8');
            request.setRequestHeader('Content-Type', 'application/json');
            request.setRequestHeader('Authorization', '5b3ce3597851110001cf6248e84a8f422c9847879e4f831a70c6004f');

            request.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(request.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: request.responseText
                    });
                }
            };

            var body = '{"coordinates":[';

            for (var i = 0; i < coordinates.length; i++) {
                if (i == (coordinates.length - 1)) {
                    body = body + '[' + coordinates[i] + ']';
                } else {
                    body = body + '[' + coordinates[i] + '],';
                }
            }

            body = body + '],"instructions":"true","instructions_format":"text","language":"es","units":"km"}';

            // "alternative_routes":{"share_factor":0.6,"target_count":2,"weight_factor":1.4},

            request.send(body);

        } catch (err) {
            throw new Error(err);
        }
    })
}

/**
 * Garda unha planificación na plataforma
 * @param {String} token
 * @param {Object} planificacion 
 * @param {Array} elementos 
 * @returns {Object}
 */
export const savePlanificacion = async (token, planificacion, elementos) => {
    try {
        const json = await Planificador.savePlanificacion(token, planificacion, elementos);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén aquelas planificacións almacenadas e visibles por todos os usuarios
 * @param {Boolean} signal 
 * @param {String} token 
 * @returns {Object}
 */
export const getPlanificacions = async (signal, token) => {
    try {
        const json = await Planificador.getPlanificacions(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Comparte unha planificación almacenada
 * @param {String} token 
 * @param {Boolean} isShared 
 * @param {Number} id 
 * @returns {Object}
 */
export const sharePlanificacion = async (token, isShared, id) => {
    try {
        const json = await Planificador.sharePlanificacion(token, isShared, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os elementos que compoñen unha planificación
 * @param {Number} id 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getElements = async (id, signal) => {
    try {
        const json = await Planificador.getElements(id, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Elimina unha planificación
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const deletePlanificacion = async (id, token) => {
    try {
        const json = await Planificador.deletePlanificacion(id, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Edita unha planificación almacenada
 * @param {String} titulo 
 * @param {String} comentario 
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const editPlanificacion = async (titulo, comentario, id, token) => {
    try {
        const json = await Planificador.editPlanificacion(token, titulo, comentario, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as planificacións ordenadas dun determinado modo
 * @param {String} token 
 * @param {String} type 
 * @returns {Object}
 */
export const sortBy = async (token, type) => {
    try {
        const json = await Planificador.sortBy(token, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as planificacións favoritas ordenadas dun determinado modo
 * @param {String} token 
 * @param {String} type 
 * @returns {Object}
 */
export const favSortBy = async (token, type) => {
    try {
        const json = await Planificador.favSortBy(token, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as planificacións en función dun determinado nome introducido polo usuario
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getByName = async (token, name) => {
    try {
        const json = await Planificador.getByName(token, name);
        return json
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Obtén as planificacións favoritas en función dun determinado nome introducido polo usuario
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
 export const getFavByName = async (token, name) => {
    try {
        const json = await Planificador.getFavByName(token, name);
        return json
    } catch(err) {
        throw new Error(err);
    }
}

/**
 * Engade unha planificación como favorita
 * @param {String} token 
 * @param {Number} id_elemento 
 * @returns {Object}
 */
export const addElementoFav = async (token, id_elemento) => {
    try {
        const json = await Planificador.addElementoFav(token, id_elemento);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita unha planificación como favorita
 * @param {String} token 
 * @param {Number} id_elemento 
 * @returns {Object}
 */
export const deleteElementoFav = async (token, id_elemento) => {
    try {
        const json = await Planificador.deleteElementoFav(token, id_elemento);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}