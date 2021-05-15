const XestionDatosTurismo = require('../../XestionDatos/XestionDatosTurismo')

const Turismo = new XestionDatosTurismo();

export const getData = async (token, signal) => {
    try {
        var data = await Turismo.getTurismData(token, signal);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getElement = async (name, token) => {
    try {
        var data = await Turismo.getElementData(name, token);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElement = async (id, tipo) => {
    try {
        var data = await Turismo.getGeoItem(id, tipo);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoAll = async (tipo) => {
    try {
        var data = await Turismo.getGeoAll(tipo);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJson = async (id, tipo) => {
    try {
        var data = await Turismo.getGeoItemJson(id, tipo);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const sortBy = async (type, token) => {
    try {
        var data = await Turismo.sortBy(type, token);
        return data;
    } catch(err) {
        throw new Error(err);
    }
}

export const favsSortBy = async (type, token) => {
    try {
        var data = await Turismo.favsSortBy(type, token);
        return data;
    } catch(err) {
        throw new Error(err);
    }
}

export const addElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Turismo.addElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteElementoFav = async (token, id_elemento, type) => {
    try {
        const json = await Turismo.deleteElementoFav(token, id_elemento, type);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getElementFavByName = async (token, name) => {
    try {
        const json = await Turismo.getElementFavByName(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}