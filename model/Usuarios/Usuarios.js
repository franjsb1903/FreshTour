import XestionDatosUsuarios from '../../XestionDatos/XestionDatosUsuarios';

const Usuarios = new XestionDatosUsuarios();

export const registerUser = async (user) => {

    try{
        const json = await Usuarios.registerUser(user);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}

export const loginUser = async (user) => {
    try {
        const json = await Usuarios.loginUser(user);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}

export const getUserByToken = async (token) => {
    try {
        const json = await Usuarios.getUserByToken(token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Usuarios.addElementoFav(token, id_elemento, type);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}