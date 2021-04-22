import XestionDatosOpinions from '../../XestionDatos/XestionDatosOpinions';

const Opinions = new XestionDatosOpinions();

export const getOpinions = async (type, id) => {

    try {
        const json = await Opinions.getOpinions(type, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}