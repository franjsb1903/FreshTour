const fetchJsonGet = async (url, token) => {

    var headers = {}
    if(token) {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': token
        }
    } else {
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, {
        method: 'get',
        headers: headers
    });

    const json = await response.json();
    return json;
}

const fetchTextGet = async (url) => {
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const text = await response.text();
    return text;
}

export const fecthJsonAuthPost = async (url, body, headers) => {


    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    const json = await response.json();
    return json;
}

export const fecthJsonAuthGet = async (url, headers) => {


    const response = await fetch(url, {
        method: 'GET',
        headers: headers
    });

    const json = await response.json();
    return json;
}

export const fetchJsonActionUserPost = async (url, token, id_elemento, type) => {

    var body = {
        id_elemento: id_elemento,
        type: type
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'access-token': token
        },
        body: JSON.stringify(body)
    });

    const json = await response.json();
    return json;
}

export { fetchJsonGet, fetchTextGet }