import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost } from '../Util/FetchUtil'


class XestionDatosTurismo {

    async getTurismData(token, signal) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo;
        try {
            const json = await fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }

    }

    async getElementData(name, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + "/" + name;
        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

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

    async sortBy(type, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + properties.url.turismo.sortBy + type;
        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favsSortBy(type, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + properties.url.turismo.fav + properties.url.turismo.sortBy + type;
        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addElementoFav(token, id_elemento, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + properties.url.turismo.fav;
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

    async deleteElementoFav(token, id_elemento, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + properties.url.turismo.fav;
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

    async getElementFavByName(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + properties.url.turismo.fav + "/" + name;
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