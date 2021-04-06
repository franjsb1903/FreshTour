import properties from '../properties/properties_expo'

const getSearchData = async (search) => {
    const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.nominatim + search;
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    return json;
}

const getTurismData = async (search) => {
    const url = properties.connection.type + "://" + properties.connection.host + ":" + properties.connection.port + properties.url.turism;
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const json = await response.json();
    return json;
}

export { getSearchData, getTurismData };