/**
 * @fileoverview Xestión de datos do Planificador
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación da xestión de datos
*/

// propiedades
import properties from '../properties/properties_expo';

// Util
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'

// módulos
import AsyncStorage from '@react-native-async-storage/async-storage';

class XestionDatosPlanificador {

    /**
    * Obtén información a partir dunha busca de usuario
    * @param {String} search 
    * @returns {Object}
    */
    async getSearchData(search) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_json + search;
        else {
            url = url + properties.url.planificador.nominatim_json + search;
        }
        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información do elemento elixido polo usuario para a súa xeolocalización
    * @param {String} selected 
    * @returns {String}
    */
    async getSearchItem(selected) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_geojson + selected;
        else {
            url = url + properties.url.planificador.nominatim_geojson + selected;
        }
        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Garda unha planificación na plataforma
    * @param {String} token
    * @param {Object} planificacion 
    * @param {Array} elementos 
    * @returns {Object}
    */
    async savePlanificacion(token, planificacion, elementos) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.new;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.new;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                titulo: planificacion.titulo,
                comentario: planificacion.comentario,
                isShared: planificacion.isShared,
                elementos: elementos,
                distancia: planificacion.distancia,
                tempoVisita: planificacion.tempoVisita,
                tempoRuta: planificacion.tempoRuta
            }

            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async getPlanificacions(signal, token) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main;
        else {
            url = url + properties.url.planificador.main;
        }
        try {
            const json = await fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Comparte unha planificación almacenada
    * @param {String} token 
    * @param {Boolean} isShare 
    * @param {Number} id 
    * @returns {Object}
    */
    async sharePlanificacion(token, isShare, id) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.share;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.share;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                isShare: isShare,
                id: id
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async getElements(id, signal) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.elements + id;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.elements + id;
        }
        try {
            const json = await fetchJsonGet(url, undefined, signal);
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
    async deletePlanificacion(id, token) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.delete;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.delete;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id: id
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
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
    async editPlanificacion(token, titulo, comentario, id) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.edit;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.edit;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                titulo: titulo,
                comentario: comentario,
                id: id
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async sortBy(token, type) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.sortBy + type;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.sortBy + type;
        }
        try {
            const json = await fetchJsonGet(url, token);
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
    async favSortBy(token, type) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.fav + properties.url.planificador.sortBy + type;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.fav + properties.url.planificador.sortBy + type;
        }

        try {
            const json = await fetchJsonGet(url, token);
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
    async getByName(token, name) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.byName + name;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.byName + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Engade unha planificación como favorita
    * @param {String} token 
    * @param {Number} id_elemento 
    * @returns {Object}
    */
    async addElementoFav(token, id_elemento) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.fav;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.fav;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async deleteElementoFav(token, id_elemento) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.fav;
        else {
            url = url + properties.url.planificador.main + properties.url.planificador.fav;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = XestionDatosPlanificador;