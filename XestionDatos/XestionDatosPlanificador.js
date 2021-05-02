import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'


class XestionDatosPlanificador {

    async getSearchData(search) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_json + search;
        try {
            const json = await fetchJsonGet(url);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getSearchItem(selected) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.nominatim_geojson + selected;
        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async savePlanificacion(token, planificacion, elementos) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.new;
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

            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;

        } catch (err) {
            throw new Error(err);
        }
    }

    async getPlanificacions(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main;

        try {
            const json = await fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async sharePlanificacion(token, isShare, id) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.share;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                isShare: isShare,
                id: id
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getElements(id, signal) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.elements + id;

        try {
            const json = await fetchJsonGet(url, undefined, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deletePlanificacion(id, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.delete;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id: id
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async editPlanificacion(token, titulo, comentario, id) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.edit;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                titulo: titulo,
                comentario: comentario,
                id: id
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async sortBy(token, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.sortBy + type;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favSortBy(token, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.fav + properties.url.planificador.sortBy + type;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByName(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.planificador.main + properties.url.planificador.byName + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = XestionDatosPlanificador;