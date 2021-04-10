import XestionDatosOpinions from '../../XestionDatos/XestionDatosOpinions';

const Opinions = new XestionDatosOpinions();

const getCountElement = async (type, id) => {
    try {
        const json = await Opinions.getOpinionsCount(type, id);
        
        return json;
    } catch (err) {
        console.error(err);
    }
}

export { getCountElement }