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
        console.error(err);
    }
}

const getItem = async (item) => {
    try {
        const text = await Planificador.getSearchItem(item);
        return text;
    } catch (err) {
        console.error(err);
    }
}

export { getData, getItem }