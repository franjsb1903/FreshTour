import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'

class XestionDatosHospedaxe {

    async getAll(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByName(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.all + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByName(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElement(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoByTag(tag, secondTag) {

        let url;
        if(secondTag) {
            url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe_bymultipletag + "('" + tag + "','" + secondTag + "')";
        } else {
            url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe_bytag + "'" + tag + "'";
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoItemJson(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.hospedaxe + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = this.traductor(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSort(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSort(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav + properties.url.hospedaxe.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFav(token, id_lugar_hospedaxe) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hospedaxe: id_lugar_hospedaxe
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch(err) {
            throw new Error(err);
        }
    }

    async quitFav(token, id_lugar_hospedaxe) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.hospedaxe.main + properties.url.hospedaxe.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hospedaxe: id_lugar_hospedaxe
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch(err) {
            throw new Error(err);
        }
    }

    traductor(tag) {
        switch (tag) {
            case "hotel":
                return "Hotel";
            case "hostel":
                return "Hostal";
            case "guest_house":
                return "Aloxamento";
            case "caravan_site":
                return "Estacionamento de caravanas";
            case "apartment":
                return "Vivenda";
            case "camp_pitch":
                return "Camping";
            case "camp_site":
                return "Camping";
            case "motel":
                return "Motel";
            default:
                return "Estancia";
        }
    }
}

module.exports = XestionDatosHospedaxe;