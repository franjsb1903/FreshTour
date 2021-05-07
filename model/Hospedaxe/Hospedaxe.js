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