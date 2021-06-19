/**
 * @fileoverview Modelo das actividades de lecer
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// xestion de datos
import XestionDatosLecer from '../../XestionDatos/XestionDatosLecer';

const Lecer = new XestionDatosLecer();

// Hostalaria

/**
 * Obtén todos os lugares de hostalaría
 * @param {Boolean} signal 
 * @param {String} token 
 * @returns {Object}
 */
export const getAllHostalaria = async (signal, token) => {
    try {
        const json = await Lecer.getAllHostalaria(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hostalaría concreto
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const getHostalariaConcreto = async (id, token) => {
    try {
        const json = await Lecer.getHostalariaConcreto(id, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hostalaría por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getByNameHostalaria = async (token, name) => {
    try {
        const json = await Lecer.getByNameHostalaria(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén un lugar de hostalaría favorito por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getFavByNameHostalaria = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameHostalaria(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun lugar de hostalaría
 * @param {Number} id 
 * @returns {Text}
 */
export const getGeoElementHostalaria = async (id) => {
    try {
        const data = await Lecer.getGeoElementHostalaria(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun determinado tipo de lugar de hostalaría
 * @param {String} tag 
 * @returns {Object}
 */
export const getGeoByTagHostalaria = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagHostalaria(tag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun lugar de hostalaría en formato JSON
 * @param {Number} id 
 * @returns {Object}
 */
export const getGeoElementJsonHostalaria = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonHostalaria(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os lugares de hostalaría filtrados por unha opción e ordenados dun determinado modo
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const filterSortHostalaria = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortHostalaria(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén os lugares de hostalaría favoritos filtrados por unha opción e ordenados dun determinado modo
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const favFilterSortHostalaria = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortHostalaria(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Engade un elemento como favorito
 * @param {String} token 
 * @param {Number} id_lugar_hostalaria 
 * @returns {Object}
 */
export const addFavHostalaria = async (token, id_lugar_hostalaria) => {
    try {
        const json = await Lecer.addFavHostalaria(token, id_lugar_hostalaria);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita un elemento como favorito
 * @param {String} token 
 * @param {Number} id_lugar_hostalaria 
 * @returns {Object}
 */
export const quitFavHostalaria = async (token, id_lugar_hostalaria) => {
    try {
        const json = await Lecer.quitFavHostalaria(token, id_lugar_hostalaria);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

// Ocio

/**
 * Obtén todas as actividades de ocio
 * @param {Boolean} signal 
 * @param {String} token 
 * @returns {Object}
 */
export const getAllOcio = async (signal, token) => {
    try {
        const json = await Lecer.getAllOcio(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén unha actividade de ocio concreta
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const getOcioConcreto = async (id, token) => {
    try {
        const json = await Lecer.getOcioConcreto(id, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén unha actividade de ocio por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getByNameOcio = async (token, name) => {
    try {
        const json = await Lecer.getByNameOcio(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén unha actividade de ocio favorita por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getFavByNameOcio = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameOcio(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dunha actividade de ocio
 * @param {Number} id 
 * @returns {String}
 */
export const getGeoElementOcio = async (id) => {
    try {
        const data = await Lecer.getGeoElementOcio(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun determinado tipo de actividade de ocio
 * @param {String} tag 
 * @returns {String}
 */
export const getGeoByTagOcio = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagOcio(tag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica de dous tipos de actividades de ocio
 * @param {String} tag 
 * @param {String} secondTag 
 * @returns {String}
 */
export const getGeoByMultipleTagOcio = async (tag, secondTag) => {
    try {
        const data = await Lecer.getGeoByMultipleTagOcio(tag, secondTag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dunha actividade de ocio en formato JSON
 * @param {Number} id 
 * @returns {Object}
 */
export const getGeoElementJsonOcio = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonOcio(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as actividades de ocio filtradas e ordenadas
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const filterSortOcio = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortOcio(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as actividades de ocio favoritas filtradas e ordenadas
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const favFilterSortOcio = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortOcio(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Engade unha actividade de ocio como favorita
 * @param {String} token 
 * @param {Number} id_actividade_ocio 
 * @returns {Object}
 */
export const addFavOcio = async (token, id_actividade_ocio) => {
    try {
        const json = await Lecer.addFavOcio(token, id_actividade_ocio);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita unha actividade de ocio como favorita
 * @param {String} token 
 * @param {Number} id_actividade_ocio 
 * @returns {Object}
 */
export const quitFavOcio = async (token, id_actividade_ocio) => {
    try {
        const json = await Lecer.quitFavOcio(token, id_actividade_ocio);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

// Outras

/**
 * Obtén as outras actividades de lecer
 * @param {Boolean} signal 
 * @param {String} token 
 * @returns {Object}
 */
export const getAllOutras = async (signal, token) => {
    try {
        const json = await Lecer.getAllOutras(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén outra actividade de lecer concreta
 * @param {Number} id 
 * @param {String} token 
 * @returns {Object}
 */
export const getOutrasConcreto = async (id, token) => {
    try {
        const json = await Lecer.getOutrasConcreto(id, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén outra actividade de lecer por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getByNameOutras = async (token, name) => {
    try {
        const json = await Lecer.getByNameOutras(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén outra actividade de lecer favorita por nome
 * @param {String} token 
 * @param {String} name 
 * @returns {Object}
 */
export const getFavByNameOutras = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameOutras(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica doutra actividade de lecer
 * @param {Number} id 
 * @returns {String}
 */
export const getGeoElementOutras = async (id) => {
    try {
        const data = await Lecer.getGeoElementOutras(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica dun determinado tipo das outras actividades de lecer
 * @param {String} tag 
 * @returns {String}
 */
export const getGeoByTagOutras = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagOutras(tag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén información xeográfica doutra actividade de lecer en formato JSON
 * @param {Number} id 
 * @returns {Object}
 */
export const getGeoElementJsonOutras = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonOutras(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén outras actividades de lecer filtradas e ordenadas
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const filterSortOutras = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortOutras(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén as outras actividades de lecer favoritas filtradas e ordenadas
 * @param {String} typeSort 
 * @param {String} token 
 * @returns {Object}
 */
export const favFilterSortOutras = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortOutras(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Engade outra actividade de lecer como favorita
 * @param {String} token 
 * @param {Number} id_outra_actividade 
 * @returns {Object}
 */
export const addFavOutras = async (token, id_outra_actividade) => {
    try {
        const json = await Lecer.addFavOutras(token, id_outra_actividade);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Quita outra actividade de lecer como favorita
 * @param {String} token 
 * @param {Number} id_outra_actividade 
 * @returns {Object}
 */
export const quitFavOutras = async (token, id_outra_actividade) => {
    try {
        const json = await Lecer.quitFavOutras(token, id_outra_actividade);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}