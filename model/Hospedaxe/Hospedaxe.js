import XestionDatosHospedaxe from '../../XestionDatos/XestionDatosHospedaxe';

const Hospedaxe = new XestionDatosHospedaxe();

export const getAll = async (signal) => {
    try {
        const json = await Hospedaxe.getAll(signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const getGeoElement = async (id, tipo) => {
    try {
        const json = await Hospedaxe.getGeoElement(id, tipo);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const filterSort = async (typeSort) => {
    try {
        const json = await Hospedaxe.filterSort(typeSort);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}