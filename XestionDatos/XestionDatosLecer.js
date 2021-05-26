import properties from '../properties/properties_expo';
import { fetchJsonGet, fetchTextGet, fecthJsonAuthPost, fetchJsonDelete } from '../Util/FetchUtil'
import { traductorHostalaria, traductorOcio, traductorOutras } from '../Util/TraductorUtil';
import AsyncStorage from '@react-native-async-storage/async-storage';


class XestionDatosHostalaria {

    async getAllHostalaria(signal, token) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.all;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.all;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getHostalariaConcreto(id, token) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.concreto + "/" + id;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.concreto + "/" + id;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameHostalaria(token, name) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.byName + name
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.byName + name
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameHostalaria(token, name) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + "/" + name;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + "/" + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementHostalaria(id) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;
        } else {
            url = url + properties.url.geoserver.hostalaria + id;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoByTagHostalaria(tag) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.hostalaria_bytag + "'" + tag + "'";
        } else {
            url = url + properties.url.geoserver.hostalaria_bytag + "'" + tag + "'";
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonHostalaria(id) {
        var url = await AsyncStorage.getItem('geoserver');
        
        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.hostalaria + id;
        } else {
            url = url + properties.url.geoserver.hostalaria + id;
        }

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorHostalaria(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortHostalaria(typeSort, token) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.filter + typeSort;
        } 

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortHostalaria(typeSort, token) {

        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + properties.url.lecer.hostalaria.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav + properties.url.lecer.hostalaria.filter + typeSort;
        }

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavHostalaria(token, id_lugar_hostalaria) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;
        }

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
        var url = await AsyncStorage.getItem('url');
        
        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.hostalaria.main + properties.url.lecer.hostalaria.fav;
        }

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
        
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.all;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.all;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getOcioConcreto(id, token) {
        
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.concreto + '/' + id;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.concreto + '/' + id;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameOcio(token, name) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.byName + name
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.byName + name
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameOcio(token, name) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + "/" + name;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + "/" + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementOcio(id) {
        var url = await AsyncStorage.getItem('geoserver');
        
        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;
        } else {
            url = url + properties.url.geoserver.ocio + id;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoByTagOcio(tag) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.ocio_bytag + "'" + tag + "'";
        } else {
            url = url + properties.url.geoserver.ocio_bytag + "'" + tag + "'";
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoByMultipleTagOcio(tag, secondTag) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.ocio_bymultipletag + "('" + tag + "','" + secondTag + "')";
        } else {
            url = url + properties.url.geoserver.ocio_bymultipletag + "('" + tag + "','" + secondTag + "')";
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonOcio(id) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.ocio + id;
        } else {
            url = url + properties.url.geoserver.ocio + id;
        }

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorOcio(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortOcio(typeSort, token) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.filter + typeSort;
        }

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortOcio(typeSort, token) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + properties.url.lecer.ocio.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav + properties.url.lecer.ocio.filter + typeSort;
        }

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavOcio(token, id_actividade_ocio) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;
        }

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
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.ocio.main + properties.url.lecer.ocio.fav;
        }

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
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.all;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.all;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getOutrasConcreto(id, token) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.concreto + '/' + id;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.concreto + '/' + id;
        }

        try {
            const json = fetchJsonGet(url, token, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getByNameOutras(token, name) {
        var url = await AsyncStorage.getItem('url');
        
        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.byName + name
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.byName + name
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getFavByNameOutras(token, name) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + "/" + name;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + "/" + name;
        }

        try {
            const json = await fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementOutras(id) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.outras + id;
        } else {
            url = url + properties.url.geoserver.outras + id;
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoByTagOutras(tag) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url){
            url = properties.url.geoserver.url + properties.url.geoserver.outras_bytag + "'" + tag + "'";
        } else {
            url = url + properties.url.geoserver.outras_bytag + "'" + tag + "'";
        }

        try {
            const text = await fetchTextGet(url);
            return text;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getGeoElementJsonOutras(id) {
        var url = await AsyncStorage.getItem('geoserver');

        if(!url) {
            url = properties.url.geoserver.url + properties.url.geoserver.outras + id;
        } else {
            url = url + properties.url.geoserver.outras + id;
        }

        try {
            const json = await fetchJsonGet(url);
            json.features[0].properties.sub_tag = traductorOutras(json.features[0].properties.sub_tag);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async filterSortOutras(typeSort, token) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.filter + typeSort;
        }

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async favFilterSortOutras(typeSort, token) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + properties.url.lecer.outras.filter + typeSort;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav + properties.url.lecer.outras.filter + typeSort;
        }

        try {
            const json = fetchJsonGet(url, token);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addFavOutras(token, id_outra_actividade) {
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;
        }

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
        var url = await AsyncStorage.getItem('url');

        if(!url) {
            url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;
        } else {
            url = url + properties.url.lecer.main + properties.url.lecer.outras.main + properties.url.lecer.outras.fav;
        }

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

module.exports = XestionDatosHostalaria;