/**
 * @fileoverview Xestión de datos das opinions
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación da xestión de datos
*/

// módulos
import AsyncStorage from '@react-native-async-storage/async-storage';

// propiedades
import properties from '../properties/properties_expo';

// Util
import { fetchJsonGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'

class XestionDatosOpinions {

    /**
    * Obtén as opinións dun elemento
    * @param {String} type 
    * @param {Number} id 
    * @param {Boolean} signal 
    * @returns {Object}
    */
    async getOpinions(type, id, signal) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.opinions + type + "/" + id
        else {
            url = url + properties.url.opinions.main + properties.url.opinions.opinions + type + "/" + id
        }
        try {
            const json = await fetchJsonGet(url, undefined, signal);
            return json;
        } catch (err) {
            return undefined;
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
    async newOpinion(token, type, id_elemento, comentario) {
        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.newOpinion
        else {
            url = url + properties.url.opinions.main + properties.url.opinions.newOpinion
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                valoracion: comentario.valoracion,
                titulo: comentario.titulo,
                comentario: comentario.comentario,
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
    * Elimina unha opinión
    * @param {String} token 
    * @param {Number} id_elemento 
    * @param {String} type 
    * @param {Number} id 
    * @returns {Object}
    */
    async deleteOpinion(token, id_elemento, type, id) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.delete
        else {
            url = url + properties.url.opinions.main + properties.url.opinions.delete
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento,
                type: type,
                id: id
            }

            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
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
    async editOpinion(token, type, id_elemento, comentario, id) {

        var url = await AsyncStorage.getItem('url');

        if (!url)
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.edit
        else {
            url = url + properties.url.opinions.main + properties.url.opinions.edit;
        }
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                valoracion: comentario.valoracion,
                titulo: comentario.titulo,
                comentario: comentario.comentario,
                id_elemento: id_elemento,
                type: type,
                id: id
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosOpinions;