import properties from '../properties/properties_expo';
import { fecthJsonAuthPost, fecthJsonAuthGet, fetchJsonDelete } from '../Util/FetchUtil'

class XestionDatosUsuarios {

    async registerUser(user) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.auth + properties.url.usuarios.register;

        try {
            const body = {
                usuario: user.usuario,
                nome: user.nome,
                apelidos: user.apelidos,
                email: user.email,
                contrasinal: user.contrasinal
            }
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async loginUser(user) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.auth + properties.url.usuarios.login;

        try {
            const body = {
                usuario: user.usuario,
                contrasinal: user.contrasinal
            }
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async getUserByToken(token) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.auth + properties.url.usuarios.me;
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fecthJsonAuthGet(url, headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async addElementoFav(token, id_elemento, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.main + properties.url.usuarios.turismo;
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento,
                type: type
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    async deleteElementoFav(token, id_elemento, type) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.main + properties.url.usuarios.turismo;
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const body = {
                id_elemento: id_elemento,
                type: type
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify(body));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }
    
    async getElementFavByName(token, name) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.main + properties.url.usuarios.turismo + "/" + name;
        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fecthJsonAuthGet(url, headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosUsuarios;