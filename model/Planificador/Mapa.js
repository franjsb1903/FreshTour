const XestionDatosPlanificador = require('../../XestionDatos/XestionDatosPlanificador')

const Planificador = new XestionDatosPlanificador();

const getData = async (newSearch) => {
    try {
        if (newSearch.length === 0) {
            return undefined;
        }
        const json = await Planificador.getSearchData(newSearch);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

const getItem = async (item) => {
    try {
        const text = await Planificador.getSearchItem(item);
        return text;
    } catch (err) {
        throw new Error(err);
    }
}

export { getData, getItem }