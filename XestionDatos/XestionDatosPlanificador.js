import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost } from '../Util/FetchUtil'


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

    async savePlanificacion(token, planificacion, elementos) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.new;
        console.log(url);
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                titulo: planificacion.titulo,
                comentario: planificacion.comentario,
                isShared: planificacion.isShared,
                elementos: elementos,
                distancia: planificacion.distancia,
                tempoVisita: planificacion.tempoVisita,
                tempoRuta: planificacion.tempoRuta
            }
            
            const json = fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;

        } catch (err) {
            return undefined;
        }
    }
}



module.exports = XestionDatosPlanificador;