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

export const fetchJsonDelete = async (url, headers, body) => {

    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: body
    });

    const json = await response.json();
    return json;
}

export { fetchJsonGet, fetchTextGet }