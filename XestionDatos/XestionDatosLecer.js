import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'

class XestionDatosHostalaria {

    async getAllHostalaria(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameHostalaria(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameHostalaria(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementHostalaria(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonHostalaria(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = this.traductorHostalaria(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortHostalaria(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortHostalaria(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + properties.url.lecer.hostalaria.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavHostalaria(token, id_lugar_hostalaria) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hostalaria: id_lugar_hostalaria
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async quitFavHostalaria(token, id_lugar_hostalaria) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_lugar_hostalaria: id_lugar_hostalaria
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAllOcio(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameOcio(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameOcio(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementOcio(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonOcio(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = this.traductorOcio(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortOcio(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortOcio(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + properties.url.lecer.ocio.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavOcio(token, id_actividade_ocio) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_actividade_ocio: id_actividade_ocio
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async quitFavOcio(token, id_actividade_ocio) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_actividade_ocio: id_actividade_ocio
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getAllOutras(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameOutras(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameOutras(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementOutras(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.outras + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonOutras(id) {

        const url = properties.url.geoserver.url + properties.url.geoserver.outras + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = this.traductorOutras(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortOutras(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortOutras(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + properties.url.lecer.outras.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavOutras(token, id_outra_actividade) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_outra_actividade: id_outra_actividade
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async quitFavOutras(token, id_outra_actividade) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_outra_actividade: id_outra_actividade
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    traductorHostalaria(tag) {
        switch (tag) {
            case "bar":
                return "Bar";
            case "restaurant":
                return "Restaurante";
            case "cafe":
                return "Café";
            case "pub":
                return "Pub";
            case "food_court":
                return "Zona de comidas";
            case "ice_cream":
                return "Xeadería";
            case "confectionery":
                return "Pastelería";
            case "bakery":
                return "Panadería";
            case "chocolate":
                return "Chocolatería";
            default:
                return "Estancia";
        }
    }

    traductorOcio(tag) {
        switch (tag) {
            case "picnic_table":
                return "Picnic";
            case "picnic_site":
                return "Picnic";
            case "amusement_arcade":
                return "Sala de xogos";
            case "bowling_alley":
                return "Bolera";
            case "escape_game":
                return "Escape room";
            case "garden":
                return "Xardín";
            case "park":
                return "Parque";
            case "playground":
                return "Parque infantil";
            case "stadium":
                return "Estadio";
            case "trampoline_park":
                return "Parque de camas elásticas";
            case "pitch":
                return "Zona de deportes ao aire libre";
            case "sports_centre":
                return "Centro deportivo";
            case "outdoor_seating":
                return "Terraza";
            case "dance":
                return "Baile";
            case "sports_hall":
                return "Pabellón deportivo";
            case "cinema":
                return "Cine";
            case "theatre":
                return "Teatro";
            case "nightclub":
                return "Club nocturno";
            case "viewpoint":
                return "Mirador";
            default:
                return "Ocio";
        }
    }

    traductorOutras(tag) {

        switch (tag) {
            case "bank":
                return "Banco";
            case "pharmacy":
                return "Farmacia";
            case "post_office":
                return "Oficina de Correos";
            case "taxi":
                return "Taxi";
            case "police":
                return "Policía";
            case "bicycle_parking":
                return "Parking de bicicletas";
            case "atm":
                return "Caixeiro";
            case "toilets":
                return "Baños públicos";
            case "supermarket":
                return "Supermercado";
            case "convenience":
                return "Pequeno supermercado";
            case "seafood":
                return "Pescadería";
            case "butcher":
                return "Carnicería";
            case "clothes":
                return "Tenda de roupa";
            case "gift":
                return "Tenda de regalos";
            case "shoes":
                return "Tenda de zapatos";
            case "beverages":
                return "Tenda de bebidas";
            case "department_store":
                return "Grandes almacenes";
            case "bag":
                return "Tenda de bolsas";
            case "perfumery":
                return "Perfumería";
            case "information":
                return "Punto de información";
            case "hospital":
                return "Hospital";
            case "clinic":
                return "Clínica";
            case "photo":
                return "Tenda de fotos";
            default:
                return "Outra actividade";
        }
    }
}

module.exports = XestionDatosHostalaria;