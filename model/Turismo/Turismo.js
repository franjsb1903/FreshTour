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

export const getGeoElement = async (id) => {
    try {
        var data = await Turismo.getGeoItem(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJson = async (id) => {
    try {
        var data = await Turismo.getGeoItemJson(id);
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