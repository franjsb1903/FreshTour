import XestionDatosHospedaxe from '../../XestionDatos/XestionDatosHospedaxe';

const Hospedaxe = new XestionDatosHospedaxe();

export const getAll = async (signal, token) => {
    try {
        const json = await Hospedaxe.getAll(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getByName = async (token, name) => {
    try {
        const json = await Hospedaxe.getByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getFavByName = async (token, name) => {
    try {
        const json = await Hospedaxe.getFavByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElement = async (id) => {
    try {
        const data = await Hospedaxe.getGeoElement(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJson = async (id) => {
    try {
        var json = await Hospedaxe.getGeoItemJson(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const filterSort = async (typeSort, token) => {
    try {
        const json = await Hospedaxe.filterSort(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const favFilterSort = async (typeSort, token) => {
    try {
        const json = await Hospedaxe.favFilterSort(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addFav = async (token, id_lugar_hospedaxe) => {
    try {
        const json = await Hospedaxe.addFav(token, id_lugar_hospedaxe);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const quitFav = async (token, id_lugar_hospedaxe) => {
    try {
        const json = await Hospedaxe.quitFav(token, id_lugar_hospedaxe);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}