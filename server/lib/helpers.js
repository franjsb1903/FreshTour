/**
 * @fileoverview Funcións comúns a empregar entre as funcionalidades do servidor
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const helpers = {};

/**
 * Lanza un erro como resposta a unha petición
 * @param {Number} code 
 * @param {String} message 
 * @param {Object} err 
 * @param {Object} res 
 * @returns {Object}
 */
helpers.onError = (code, message, err, res) => {
    if (err)
        console.error(err.message);
    return res.status(code).json({
        status: code,
        message: message
    });
}

/**
 * Lanza un erro como resposta a unha petición que require de autenticación
 * @param {Number} code 
 * @param {String} message 
 * @param {Object} err 
 * @param {Object} res 
 * @returns {Object}
 */
helpers.onErrorAuth = (code, message, err, res) => {
    if (err) {
        console.error(err.message);
    }
    return res.status(code).json({
        message: message,
        auth: false,
        token: null
    });
}

/**
 * Resposta indicando que unha autenticación se fixo correctamente
 * @param {String} token 
 * @param {Object} user 
 * @param {Object} res 
 * @param {Array} planificacionsFav 
 * @param {Array} planificacions 
 * @param {Array} opinions 
 * @param {Array} elementosFav 
 * @param {Array} hospedaxeFav 
 * @param {Array} hostalariaFav 
 * @param {Array} ocioFav 
 * @param {Array} outrasArray 
 * @returns {Object}
 */
helpers.onCorrectAuth = (token, user, res, planificacionsFav, planificacions, opinions, elementosFav, hospedaxeFav, hostalariaFav, ocioFav, outrasArray) => {
    return res.status(200).send({
        auth: true,
        token: token,
        status: 200,
        user: user,
        planificacionsFav: planificacionsFav,
        planificacions: planificacions,
        opinions: opinions,
        elementosFav: elementosFav,
        hospedaxesFav: hospedaxeFav,
        hostalariaFav: hostalariaFav,
        ocioFav: ocioFav,
        outrasFav: outrasArray
    });
}

/**
 * Executa unha consulta na base de datos, empregada por un tipo concreto de operación
 * @param {String} query 
 * @param {Number} id_usuario 
 * @param {Number} id_elemento 
 * @param {Object} res 
 * @param {Object} pool 
 */
helpers.onExecuteQuery = (query, id_usuario, id_elemento, res, pool) => {
    pool.query(query, [id_usuario, id_elemento], (err, results) => {
        if (err) {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }
        res.json({
            status: 200
        });
    });
}

module.exports = helpers;