/**
 * @fileoverview Modelo do Planificador coas funcionalidades asociadas ao mapa
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do modelo
*/

// xestion de datos
const XestionDatosPlanificador = require('../../XestionDatos/XestionDatosPlanificador')

const Planificador = new XestionDatosPlanificador();

/**
 * Obtén información a partir dunha busca de usuario
 * @param {String} newSearch 
 * @returns {Object}
 */
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

/**
 * Obtén información do elemento elixido polo usuario para a súa xeolocalización
 * @param {String} item 
 * @returns {String}
 */
const getItem = async (item) => {
    try {
        const text = await Planificador.getSearchItem(item);
        return text;
    } catch (err) {
        throw new Error(err);
    }
}

export { getData, getItem }