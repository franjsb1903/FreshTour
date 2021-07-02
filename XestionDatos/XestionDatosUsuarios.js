/**
 * @fileoverview Xestión de datos dos Usuarios
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación da xestión de datos
*/

// propiedades
import properties from '../properties/properties_expo';

// Util
import { fecthJsonAuthPost, fecthJsonAuthGet, fetchJsonDelete } from '../Util/FetchUtil'

// módulos
import AsyncStorage from '@react-native-async-storage/async-storage';

class XestionDatosUsuarios {

    /**
    * Rexistra un usuario na plataforma
    * @param {Object} user 
    * @returns {Object}
    */
    async registerUser(user) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.usuarios.auth + properties.url.usuarios.register;

        console.log(url);
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

    /**
    * Permite o inicio de sesión dun usuario na plataforma
    * @param {Object} user 
    * @returns {Object}
    */
    async loginUser(user) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.usuarios.auth + properties.url.usuarios.login;

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

    /**
    * Inicio de sesión dun usuario a través do seu token
    * @param {String} token 
    * @param {Boolean} signal 
    * @returns {Object}
    */
    async getUserByToken(token, signal) {
        const url = properties.connection.type + "://" + properties.connection.host + properties.url.usuarios.auth + properties.url.usuarios.me;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fecthJsonAuthGet(url, headers, signal);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Permite a edición dun usuario
    * @param {String} token 
    * @param {Object} user 
    * @returns {Object}
    */
    async editUser(token, user) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.usuarios.main + properties.url.usuarios.edit;

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
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fecthJsonAuthPost(url, JSON.stringify(body), headers);
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
    * Eliminación da conta dun usuario
    * @param {String} token 
    * @returns {Object}
    */
    async deleteUser(token) {

        const url = properties.connection.type + "://" + properties.connection.host + properties.url.usuarios.main + properties.url.usuarios.delete;

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': token
            }
            const json = await fetchJsonDelete(url, headers, JSON.stringify({}));
            return json;
        } catch (err) {
            throw new Error(err);
        }
    }

}

module.exports = XestionDatosUsuarios;