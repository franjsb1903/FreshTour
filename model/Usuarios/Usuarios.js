import XestionDatosUsuarios from '../../XestionDatos/XestionDatosUsuarios';

const Usuarios = new XestionDatosUsuarios();

export const registerUser = async (user) => {

    try {
        const json = await Usuarios.registerUser(user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const loginUser = async (user) => {
    try {
        const json = await Usuarios.loginUser(user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getUserByToken = async (token, signal) => {
    try {
        const json = await Usuarios.getUserByToken(token, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Usuarios.addElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Usuarios.deleteElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getElementFavByName = async (token, name) => {
    try {
        const json = await Usuarios.getElementFavByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const editUser = async (token, user) => {
    try {
        const json = await Usuarios.editUser(token, user);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteUser = async (token) => {
    try {
        const json = await Usuarios.deleteUser(token);
        return json;
    } catch(err) {
        throw new Error(err);
    }
}