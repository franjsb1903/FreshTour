/**
 * @fileoverview Xestión de datos dos lugares de hospedaxe
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

class XestionDatosHospedaxe {

    /**
    * Obtén todos os lugares de hospedaxe da aplicación
    * @param {Boolean} signal 
    * @param {String} token 
    * @returns {Object}
    */
    async getAll(signal, token) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.all;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
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
    async getConcreto(id, token) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.concreto + '/' + id;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.concreto + '/' + id;
        }

        try {
            const json = fetchJsonGet(url, token);
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
    async getByName(token, name) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all + name;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.all + "/" + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
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
    async getFavByName(token, name) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + "/" + name;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + "/" + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
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
    async getGeoElement(id) {

        var url = await AsyncStorage.getItem('geoserver');

        if (!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe + id;
        } else {
            url = url + properties.url.geoserver.hospedaxe + id;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
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
    async getGeoByTag(tag, secondTag) {

        var url = await AsyncStorage.getItem('geoserver');

        if (!url) {
            if (secondTag) {
                url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe_bymultipletag + "('" + tag + "','" + secondTag + "')";
            } else {
                url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe_bytag + "'" + tag + "'";
            }
        } else {
            if (secondTag) {
                url = url + properties.url.geoserver.hospedaxe_bymultipletag + "('" + tag + "','" + secondTag + "')";
            } else {
                url = url + properties.url.geoserver.hospedaxe_bytag + "'" + tag + "'";
            }
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun lugar de hospedaxe en formato JSON
    * @param {Number} id 
    * @returns {Object}
    */
    async getGeoItemJson(id) {

        var url = await AsyncStorage.getItem('geoserver');

        if (!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe + id;
        } else {
            url = url + properties.url.geoserver.hospedaxe + id;
        }

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = this.traductor(json.features[0].properties.sub_tag);
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
    async filterSort(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
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
    async favFilterSort(typeSort, token) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + properties.url.hospedaxe.filter + typeSort;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + properties.url.hospedaxe.filter + typeSort;

        }

        try {
            const json = fetchJsonGet(url, token);
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
    async addFav(token, id_lugar_hospedaxe) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;
        }

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hospedaxe: id_lugar_hospedaxe
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
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
    async quitFav(token, id_lugar_hospedaxe) {

        var url = await AsyncStorage.getItem('url');

        if (!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;
        } else {
            url = url + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;
        }

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hospedaxe: id_lugar_hospedaxe
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Traductor de etiquetas ao galego
     * @param {String} tag 
     * @returns {String}
     */
    traductor(tag) {
        switch (tag) {
            case "hotel":
                return "Hotel";
            case "hostel":
                return "Hostal";
            case "guest_house":
                return "Aloxamento";
            case "caravan_site":
                return "Estacionamento de caravanas";
            case "apartment":
                return "Vivenda";
            case "camp_pitch":
                return "Camping";
            case "camp_site":
                return "Camping";
            case "motel":
                return "Motel";
            default:
                return "Estancia";
        }
    }
}

module.exports = XestionDatosHospedaxe;