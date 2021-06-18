/**
 * @fileoverview Funcións para empregar fetch e realizar peticións web
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

/**
 * Realiza unha petición web de tipo get con resposta JSON
 * @param {String} url 
 * @param {String} token 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const fetchJsonGet = async (url, token, signal) => {

    var headers = {}
    if (token) {
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
    var response;
    if (signal) {
        response = await fetch(url, {
            method: 'get',
            headers: headers,
            signal: signal
        });
    }
    else {
        response = await fetch(url, {
            method: 'get',
            headers: headers
        });
    }

    const json = await response.json();
    return json;
}

/**
 * Realiza unha petición web de tipo get con resposta de tipo texto
 * @param {String} url 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const fetchTextGet = async (url, signal) => {

    var response;

    if (signal) {
        response = await fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            signal: signal
        });
    } else {
        response = await fetch(url, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
    }
    const text = await response.text();
    return text;
}

/**
 * Realiza unha petición web de tipo post que require autenticación
 * @param {String} url 
 * @param {Object} body 
 * @param {Object} headers 
 * @returns {Object}
 */
export const fecthJsonAuthPost = async (url, body, headers) => {


    const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
    });

    const json = await response.json();
    return json;
}

/**
 * Realiza unha petición web de tipo get que require autenticación
 * @param {String} url 
 * @param {Object} headers 
 * @param {Boolean} signal 
 * @returns {Object}
 */
export const fecthJsonAuthGet = async (url, headers, signal) => {

    var response;
    if(signal) {
        response = await fetch(url, {
            method: 'GET',
            headers: headers,
            signal: signal
        });
    } else {
        response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
    }

    const json = await response.json();
    return json;
}

/**
 * Realiza unha petición web de tipo delete
 * @param {String} url 
 * @param {Object} headers 
 * @param {Object} body 
 * @returns {Object}
 */
export const fetchJsonDelete = async (url, headers, body) => {

    const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        body: body
    });

    const json = await response.json();
    return json;
}