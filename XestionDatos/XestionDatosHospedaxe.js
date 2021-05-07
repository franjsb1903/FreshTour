import properties from '../properties/properties_expo';
import { fetchJsonGet } from '../Util/FetchUtil'

class XestionDatosHospedaxe {

    async getAll(signal) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all;

        try {
            const json = fetchJsonGet(url, undefined, signal);
            return json;
        } catch(err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosHospedaxe;