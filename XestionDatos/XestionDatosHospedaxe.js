import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet } from '../Util/FetchUtil'

class XestionDatosHospedaxe {

    async getAll(signal) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all;

        try {
            const json = fetchJsonGet(url, undefined, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElement(id, tipo) {

        var url;

        if (tipo == "Hospedaxe") {
            url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe + id;
        }

        try {
            const json = await fetchTextGet(url);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSort(typeSort) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.filter + typeSort;

        try {
            const json = fetchJsonGet(url);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosHospedaxe;