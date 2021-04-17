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

export const fecthJsonAuthPost = async (url, user, isRegister) => {

    var body = {};

    if(isRegister) {
        body = {
            usuario: user.usuario,
            nome: user.nome,
            apelidos: user.apelidos,
            email: user.email,
            contrasinal: user.contrasinal
        }
    } else {
        body = {
            usuario: user.usuario,
            contrasinal: user.contrasinal
        }
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    const json = await response.json();
    return json;
}

export { fetchJsonGet, fetchTextGet }