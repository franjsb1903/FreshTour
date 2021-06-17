/**
 * @fileoverview Modelo das opinions
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// xestion de datos
import XestionDatosOpinions from '../../XestionDatos/XestionDatosOpinions';

const Opinions = new XestionDatosOpinions();

/**
 * Obtén as opinións dun elemento
 * @param {String} type 
 * @param {Number} id 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getOpinions = async (type, id, signal) => {

    try {
        const json = await Opinions.getOpinions(type, id, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Almacena unha nova opinión
 * @param {String} token 
 * @param {String} type 
 * @param {Number} id_elemento 
 * @param {Object} comentario 
 * @returns 
 */
export const newOpinion = async (token, type, id_elemento, comentario) => {

    try {
        const json = await Opinions.newOpinion(token, type, id_elemento, comentario);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Elimina unha opinión
 * @param {String} token 
 * @param {Number} id_elemento 
 * @param {String} type 
 * @param {Number} id 
 * @returns {Object}
 */
export const deleteOpinion = async (token, id_elemento, type, id) => {
    try {
        const json = await Opinions.deleteOpinion(token, id_elemento, type, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Edita unha opinión almacenada
 * @param {String} token 
 * @param {String} type 
 * @param {Number} id_elemento 
 * @param {Object} comentario 
 * @param {Number} id 
 * @returns {Object}
 */
export const editOpinion = async (token, type, id_elemento, comentario, id) => {
    try {
        const json = await Opinions.editOpinion(token, type, id_elemento, comentario, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}