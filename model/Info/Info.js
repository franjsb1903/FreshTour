import properties from '../../properties/properties_expo';
import { fetchJsonGet } from '../../Util/FetchUtil'

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