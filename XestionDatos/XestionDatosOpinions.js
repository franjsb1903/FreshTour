import properties from '../properties/properties_expo';
import { fetchJsonGet, fecthJsonAuthPost } from '../Util/FetchUtil'

/*const properties = require('../properties/properties_expo');
const { fetchJsonGet, fetchTextGet } = require('../Util/FetchUtil');*/

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

    async newOpinion(token, type, id_elemento, comentario) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.opinions.main + properties.url.opinions.newOpinion

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                valoracion: comentario.valoracion,
                titulo: comentario.titulo,
                comentario: comentario.comentario,
                id_elemento: id_elemento,
                type: type
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosOpinions;