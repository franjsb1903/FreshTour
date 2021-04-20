import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet } from '../Util/FetchUtil'


class XestionDatosTurismo {

    async getTurismData(token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo;
        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            return undefined;
        }
        
    }

    async getElementData(name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + name;
        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            return undefined;
        }
    }

    async getGeoItem(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.item + id;
        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            return undefined;
        }
    }

    async getGeoItemJson(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.item + id;
        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            return undefined;
        }
    }
}



module.exports = XestionDatosTurismo;