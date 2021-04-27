import XestionDatosOpinions from '../../XestionDatos/XestionDatosOpinions';

const Opinions = new XestionDatosOpinions();

export const getOpinions = async (type, id, signal) => {

    try {
        const json = await Opinions.getOpinions(type, id, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const newOpinion = async (token, type, id_elemento, comentario) => {

    try {
        const json = await Opinions.newOpinion(token, type, id_elemento, comentario);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const deleteOpinion = async (token, id_elemento, type, id) => {
    try {
        const json = await Opinions.deleteOpinion(token, id_elemento, type, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

export const editOpinion = async (token, type, id_elemento, comentario, id) => {
    try {
        const json = await Opinions.editOpinion(token, type, id_elemento, comentario, id);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}