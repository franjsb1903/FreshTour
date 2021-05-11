import XestionDatosLecer from '../../XestionDatos/XestionDatosLecer';

const Lecer = new XestionDatosLecer();

// Hostalaria

export const getAllHostalaria = async (signal, token) => {
    try {
        const json = await Lecer.getAllHostalaria(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getByNameHostalaria = async (token, name) => {
    try {
        const json = await Lecer.getByNameHostalaria(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getFavByNameHostalaria = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameHostalaria(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementHostalaria = async (id) => {
    try {
        const data = await Lecer.getGeoElementHostalaria(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJsonHostalaria = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonHostalaria(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const filterSortHostalaria = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortHostalaria(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const favFilterSortHostalaria = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortHostalaria(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addFavHostalaria = async (token, id_lugar_hostalaria) => {
    try {
        const json = await Lecer.addFavHostalaria(token, id_lugar_hostalaria);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const quitFavHostalaria = async (token, id_lugar_hostalaria) => {
    try {
        const json = await Lecer.quitFavHostalaria(token, id_lugar_hostalaria);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}