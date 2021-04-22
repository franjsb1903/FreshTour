import properties from '../properties/properties_expo';
import { fetchJsonGet } from '../Util/FetchUtil'

class XestionDatosOpinions {
    
    async getOpinions(type, id) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.opinions + type + "/" + id

        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            return undefined;
        }
    }

}

module.exports = XestionDatosOpinions;