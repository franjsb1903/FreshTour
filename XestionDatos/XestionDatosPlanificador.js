import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'
import AsyncStorage from '@react-native-async-storage/async-storage';

class XestionDatosPlanificador {

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
}

module.exports = XestionDatosPlanificador;