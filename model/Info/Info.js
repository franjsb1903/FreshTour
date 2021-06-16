/**
 * @fileoverview Modelo de información
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do contexto
*/

// properties
import properties from '../../properties/properties_expo';

// Util
import { fetchJsonGet } from '../../Util/FetchUtil'

/**
 * Obtén información sobre a COVID
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getCovidData = async (signal) => {

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const date = yyyy + "-" + mm + "-" + dd;

    const url = properties.info.covid_api + date + properties.info.covid_region

    try {
        const json = await fetchJsonGet(url, undefined, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Obtén a información do tempo
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const getTempoData = async (signal) => {
    const url = properties.info.meteosix_api + properties.info.meteosix_api_key
    try {
        const json = await fetchJsonGet(url, undefined, signal);
        return json;
    } catch (err) {
        throw new Error(err);
    }
}