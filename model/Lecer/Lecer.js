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

export const getGeoByTagHostalaria = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagHostalaria(tag);
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

// Ocio

export const getAllOcio = async (signal, token) => {
    try {
        const json = await Lecer.getAllOcio(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getByNameOcio = async (token, name) => {
    try {
        const json = await Lecer.getByNameOcio(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getFavByNameOcio = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameOcio(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementOcio = async (id) => {
    try {
        const data = await Lecer.getGeoElementOcio(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoByTagOcio = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagOcio(tag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoByMultipleTagOcio = async (tag, secondTag) => {
    try {
        const data = await Lecer.getGeoByMultipleTagOcio(tag, secondTag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJsonOcio = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonOcio(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const filterSortOcio = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortOcio(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const favFilterSortOcio = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortOcio(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addFavOcio = async (token, id_actividade_ocio) => {
    try {
        const json = await Lecer.addFavOcio(token, id_actividade_ocio);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const quitFavOcio = async (token, id_actividade_ocio) => {
    try {
        const json = await Lecer.quitFavOcio(token, id_actividade_ocio);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

// Outras

export const getAllOutras = async (signal, token) => {
    try {
        const json = await Lecer.getAllOutras(signal, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getByNameOutras = async (token, name) => {
    try {
        const json = await Lecer.getByNameOutras(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getFavByNameOutras = async (token, name) => {
    try {
        const json = await Lecer.getFavByNameOutras(token, name);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementOutras = async (id) => {
    try {
        const data = await Lecer.getGeoElementOutras(id);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoByTagOutras = async (tag) => {
    try {
        const data = await Lecer.getGeoByTagOutras(tag);
        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElementJsonOutras = async (id) => {
    try {
        const json = await Lecer.getGeoElementJsonOutras(id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const filterSortOutras = async (typeSort, token) => {
    try {
        const json = await Lecer.filterSortOutras(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const favFilterSortOutras = async (typeSort, token) => {
    try {
        const json = await Lecer.favFilterSortOutras(typeSort, token);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const addFavOutras = async (token, id_outra_actividade) => {
    try {
        const json = await Lecer.addFavOutras(token, id_outra_actividade);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const quitFavOutras = async (token, id_outra_actividade) => {
    try {
        const json = await Lecer.quitFavOutras(token, id_outra_actividade);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}