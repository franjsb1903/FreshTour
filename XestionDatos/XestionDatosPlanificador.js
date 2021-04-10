import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet } from '../Util/FetchUtil';


class XestionDatosPlanificador {

    async getSearchData(search) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_json + search;
        const json = await fetchJsonGet(url);
        return json;
    }

    async getSearchItem(selected) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_json + selected;
        const text = await fetchTextGet(url);
        return text;
    }

}



module.exports = XestionDatosPlanificador;