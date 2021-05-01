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