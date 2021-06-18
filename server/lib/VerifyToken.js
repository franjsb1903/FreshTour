/**
 * @fileoverview Verifica o token JWT dun usuario
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

var jwt = require('jsonwebtoken');                              // Instancia do módulo JWT
var config = require('../config/config');                       // Instancia que contén a clave secreta para o JWT

const verify = {}

/**
 * Verifica o token dun usuario
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns {Object}
 */
verify.verifyToken = (req, res, next) => {

    var token = req.headers['access-token'];
    if(!token) {                // Se o token non existe, lanza un erro como resposta
        return res.status(403).send({ auth: false, message: 'Usuario non identificado', status: 403 });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {               // Se o token non é verificado, lanza un erro como resposta
            console.log(err.message);
            return res.status(500).send({ auth: false, message: err.message, status: 500 });
        }
        req.userId = decoded.id;
        next();                 // Se o token se verifica correctamente, avanza á seguinte operación
    })
}

/**
 * Verifica o token dun usuario, sen lanzar un erro cando non se pode verificar
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 * @returns 
 */
verify.verifyTokenWithoutReturn = (req, res, next) => {

    var token = req.headers['access-token'];
    if(!token) {
        req.userId = undefined;
        next();                 // Neste caso, simplemente se avanza á seguinte operación
        return;
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            console.log(err.message);
            req.userId = undefined;
            next();
            return;
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = verify;