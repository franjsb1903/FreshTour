import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet } from '../Util/FetchUtil'


class XestionDatosPlanificador {

    async getSearchData(search) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_json + search;
        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            return undefined;
        }
    }

    async getSearchItem(selected) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_geojson + selected;
        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            return undefined;
        }
    }

}



module.exports = XestionDatosPlanificador;