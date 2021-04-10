const fetchJsonGet = async (url) => {
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

export { fetchJsonGet, fetchTextGet }