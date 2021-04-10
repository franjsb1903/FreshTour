const XestionDatosTurismo = require('../../XestionDatos/XestionDatosTurismo')

const Turismo = new XestionDatosTurismo();

const getData = async () => {
    try {
        var data = await Turismo.getTurismData();
        return data;
    } catch (err) {
        console.error(err);
    }
}

const getElement = async (name) => {
    try {
        var data = await Turismo.getElementData(name);
        return data;
    } catch (err) {
        console.error(err);
    }
}

const getGeoElement = async (id) => {
    try {
        var data = await Turismo.getGeoItem(id);
        return data;
    } catch (err) {
        console.error(err);
    }
}

export { getData, getElement, getGeoElement }