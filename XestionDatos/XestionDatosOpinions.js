import AsyncStorage from '@react-native-async-storage/async-storage';
import properties from '../properties/properties_expo';
import { fetchJsonGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'

/*const properties = require('../properties/properties_expo');
const { fetchJsonGet, fetchTextGet } = require('../Util/FetchUtil');*/

class XestionDatosOpinions {

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