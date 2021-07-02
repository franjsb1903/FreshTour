/**
 * @fileoverview Xestión de datos das actividades de lecer
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación da xestión de datos
*/

// propiedades
import properties from '../properties/properties_expo';

// Util
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil';
import { traductorHostalaria, traductorOcio, traductorOutras } from '../Util/TraductorUtil';

// módulos
import AsyncStorage from '@react-native-async-storage/async-storage';


class XestionDatosLecer {

    // Hostalaría

    /**
    * Obtén todos os lugares de hostalaría
    * @param {Boolean} signal 
    * @param {String} token 
    * @returns {Object}
    */
    async getAllHostalaria(signal, token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén un lugar de hostalaría concreto
   * @param {Number} id 
    * @param {String} token 
    * @returns {Object}
    */
    async getHostalariaConcreto(id, token) {

        const url = properties.connection.type + "://" + properties.connection.host +  properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.concreto + "/" + id;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén un lugar de hostalaría por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getByNameHostalaria(token, name) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén un lugar de hostalaría favorito por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getFavByNameHostalaria(token, name) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun lugar de hostalaría
    * @param {Number} id 
    * @returns {Text}
    */
    async getGeoElementHostalaria(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun determinado tipo de lugar de hostalaría
    * @param {String} tag 
    * @returns {Object}
    */
    async getGeoByTagHostalaria(tag) {
        const url = properties.url.geoserver.url + properties.url.geoserver.hostalaria_bytag + "'" + tag + "'";

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun lugar de hostalaría en formato JSON
    * @param {Number} id 
    * @returns {Object}
    */
    async getGeoElementJsonHostalaria(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorHostalaria(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén os lugares de hostalaría filtrados por unha opción e ordenados dun determinado modo
    * @param {String} typeSort 
    * @param {String} token 
    * @returns {Object}
    */
    async filterSortHostalaria(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén os lugares de hostalaría favoritos filtrados por unha opción e ordenados dun determinado modo
    * @param {String} typeSort 
    * @param {String} token 
    * @returns {Object}
    */
    async favFilterSortHostalaria(typeSort, token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + properties.url.lecer.hostalaria.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Engade un elemento como favorito
    * @param {String} token 
    * @param {Number} id_lugar_hostalaria 
    * @returns {Object}
    */
    async addFavHostalaria(token, id_lugar_hostalaria) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;

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

    /**
    * Quita un elemento como favorito
    * @param {String} token 
    * @param {Number} id_lugar_hostalaria 
    * @returns {Object}
    */
    async quitFavHostalaria(token, id_lugar_hostalaria) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;

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

    // Ocio

    /**
    * Obtén todas as actividades de ocio
    * @param {Boolean} signal 
    * @param {String} token 
    * @returns {Object}
    */
    async getAllOcio(signal, token) {
        
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén unha actividade de ocio concreta
    * @param {Number} id 
    * @param {String} token 
    * @returns {Object}
    */
    async getOcioConcreto(id, token) {
        
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + '/' + properties.url.lecer.ocio.concreto + '/' + id;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
   * Obtén unha actividade de ocio por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getByNameOcio(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén unha actividade de ocio favorita por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getFavByNameOcio(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dunha actividade de ocio
    * @param {Number} id 
    * @returns {String}
    */
    async getGeoElementOcio(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun determinado tipo de actividade de ocio
    * @param {String} tag 
    * @returns {String}
    */
    async getGeoByTagOcio(tag) {
        const url = properties.url.geoserver.url + properties.url.geoserver.ocio_bytag + "'" + tag + "'";

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica de dous tipos de actividades de ocio
    * @param {String} tag 
    * @param {String} secondTag 
    * @returns {String}
    */
    async getGeoByMultipleTagOcio(tag, secondTag) {
        const url = properties.url.geoserver.url + properties.url.geoserver.ocio_bymultipletag + "('" + tag + "','" + secondTag + "')";

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dunha actividade de ocio en formato JSON
    * @param {Number} id 
    * @returns {Object}
    */
    async getGeoElementJsonOcio(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorOcio(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Obtén as actividades de ocio filtradas e ordenadas
    * @param {String} typeSort 
    * @param {String} token 
    * @returns {Object}
     */
    async filterSortOcio(typeSort, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén as actividades de ocio favoritas filtradas e ordenadas
    * @param {String} typeSort 
    * @param {String} token 
     * @returns {Object}
    */
    async favFilterSortOcio(typeSort, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + properties.url.lecer.ocio.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Engade unha actividade de ocio como favorita
    * @param {String} token 
    * @param {Number} id_actividade_ocio 
    * @returns {Object}
    */
    async addFavOcio(token, id_actividade_ocio) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;

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

    /**
    * Quita unha actividade de ocio como favorita
    * @param {String} token 
    * @param {Number} id_actividade_ocio 
    * @returns {Object}
     */
    async quitFavOcio(token, id_actividade_ocio) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;

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

    // Outras

    /**
    * Obtén as outras actividades de lecer
    * @param {Boolean} signal 
    * @param {String} token 
    * @returns {Object}
    */
    async getAllOutras(signal, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.all;

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén outra actividade de lecer concreta
    * @param {Number} id 
    * @param {String} token 
    * @returns {Object}
    */
    async getOutrasConcreto(id, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.concreto + '/' + id;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén outra actividade de lecer por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getByNameOutras(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.byName + name

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén outra actividade de lecer favorita por nome
    * @param {String} token 
    * @param {String} name 
    * @returns {Object}
    */
    async getFavByNameOutras(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + "/" + name;

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica doutra actividade de lecer
    * @param {Number} id 
    * @returns {String}
    */
    async getGeoElementOutras(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.outras + id;

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica dun determinado tipo das outras actividades de lecer
    * @param {String} tag 
    * @returns {String}
    */
    async getGeoByTagOutras(tag) {
        const url = properties.url.geoserver.url + properties.url.geoserver.outras_bytag + "'" + tag + "'";

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén información xeográfica doutra actividade de lecer en formato JSON
    * @param {Number} id 
    * @returns {Object}
    */
    async getGeoElementJsonOutras(id) {
        const url = properties.url.geoserver.url + properties.url.geoserver.outras + id;

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorOutras(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén outras actividades de lecer filtradas e ordenadas
    * @param {String} typeSort 
    * @param {String} token 
    * @returns {Object}
    */
    async filterSortOutras(typeSort, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Obtén as outras actividades de lecer favoritas filtradas e ordenadas
    * @param {String} typeSort 
    * @param {String} token 
    * @returns {Object}
    */
    async favFilterSortOutras(typeSort, token) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + properties.url.lecer.outras.filter + typeSort;

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Engade outra actividade de lecer como favorita
    * @param {String} token 
    * @param {Number} id_outra_actividade 
    * @returns {Object}
    */
    async addFavOutras(token, id_outra_actividade) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;

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

    /**
    * Quita outra actividade de lecer como favorita
    * @param {String} token 
    * @param {Number} id_outra_actividade 
    * @returns {Object}
    */
    async quitFavOutras(token, id_outra_actividade) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;

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

    
}

module.exports = XestionDatosLecer;