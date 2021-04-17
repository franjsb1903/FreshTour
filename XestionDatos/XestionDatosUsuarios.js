import properties from '../properties/properties_expo';
import { fecthJsonAuthPost } from '../Util/FetchUtil'

class XestionDatosUsuarios {

    async registerUser(user) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.main + properties.url.usuarios.register;

        try {
            const json = await fecthJsonAuthPost(url, user, true);
            return json;
        } catch (err) {
            return undefined;
        }
    }

    async loginUser(user) {
        const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.usuarios.main + properties.url.usuarios.login;

        try {
            const json = await fecthJsonAuthPost(url, user, true);
            return json;
        } catch (err) {
            return undefined;
        }
    }

}

module.exports = XestionDatosUsuarios;