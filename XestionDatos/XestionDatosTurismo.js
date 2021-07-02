/**
 * @fileoverview Xestión de datos dos Monumentos e Lugares Turísticos
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación da xestión de datos
*/

// propiedades
import properties from '../properties/properties_expo';

// Util
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete, fecthJsonAuthGet } from '../Util/FetchUtil'

// módulos
import AsyncStorage from '@react-native-async-storage/async-storage';

class XestionDatosTurismo {

    /**
    * Obtén todos os monumentos e lugares turísticos da aplicación
    * @param {String} token 
    * @param {Boolean} signal 
    * @returns {Object}
    */
    async getTurismData(token, signal) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo;

        console.log(url);

        try {
            const json = await fetchJsonGet(url, token, signal);
            return json;
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
    async getLugar(token, id) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.lugar + "/" + id;

        try {
            const json = await fetchJsonGet(url, token);
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
    async getMonumento(token, id) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.monumento + "/" + id;

        try {
            const json = await fetchJsonGet(url, token);
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
    async getElementData(name, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
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
    async getGeoItem(id, tipo) {
        var url;

        if (tipo == "Lugar turístico") {
            url = properties.url.geoserver.url + properties.url.geoserver.lugares + id;
        } else if (tipo == "Monumento") {
            url = properties.url.geoserver.url + properties.url.geoserver.monumentos + id;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén a información xeográfica de todos os monumentos ou de todos os lugares turísticos
    * @param {String} tipo 
    * @returns {String}
    */
    async getGeoAll(tipo) {
        var url;

        if (tipo == "Lugar turístico") {
            url = properties.url.geoserver.url + properties.url.geoserver.lugares_all;
        } else if (tipo == "Monumento") {
            url = properties.url.geoserver.url + properties.url.geoserver.monumentos_all;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
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
    async getGeoItemJson(id, tipo) {
        var url;

        if (tipo == "Lugar turístico") {
            url = properties.url.geoserver.url + properties.url.geoserver.lugares + id;
        } else if (tipo == "Monumento") {
            url = properties.url.geoserver.url + properties.url.geoserver.monumentos + id;
        }

        try {
            const json = await fetchJsonGet(url);
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
    async sortBy(type, token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.sortBy + type;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén os elementos turísticos favoritos ordenados dun determinado modo
    * @param {String} type 
    * @param {String} token 
    * @returns {Object}
    */
    async favsSortBy(type, token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.fav + properties.url.turismo.sortBy + type;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
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
    async addElementoFav(token, id_elemento, type) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento,
                type: type
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async deleteElementoFav(token, id_elemento, type) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento,
                type: type
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
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
    async getElementFavByName(token, name) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.turismo.turismo + properties.url.turismo.fav + "/" + name;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fecthJsonAuthGet(url, headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }
}



module.exports = XestionDatosTurismo;