import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet } from '../Util/FetchUtil';


class XestionDatosTurismo {

    async getTurismData() {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo;
        const json = await fetchJsonGet(url);
        return json;
    }

    async getElementData(name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turismo.turismo + name;
        const json = await fetchJsonGet(url);
        return json;
    }

    async getGeoItem(id) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.geoserver.geoserver + id;
        const text = await fetchTextGet(url);
        return text;
    }
}



module.exports = XestionDatosTurismo;