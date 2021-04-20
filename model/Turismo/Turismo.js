const XestionDatosTurismo = require('../../XestionDatos/XestionDatosTurismo')

const Turismo = new XestionDatosTurismo();

export const getData = async (token) => {
    try {
        var data = await Turismo.getTurismData(token);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getElement = async (name) => {
    try {
        var data = await Turismo.getElementData(name);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getGeoElement = async (id) => {
    try {
        var data = await Turismo.getGeoItem(id);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export const getGeoElementJson = async (id) => {
    try {
        var data = await Turismo.getGeoItemJson(id);
        return data;
    } catch (err) {
        console.error(err);
    }
}