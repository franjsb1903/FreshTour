import properties from '../properties/properties_expo';
import { fetchJsonGet } from '../Util/FetchUtil'

class XestionDatosOpinions {

    async getOpinionsCount(type, id) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.opinions_count + type + "/" + id;

        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            return undefined;
        }
    }

}

module.exports = XestionDatosOpinions;