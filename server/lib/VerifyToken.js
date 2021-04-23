var jwt = require('jsonwebtoken');
var config = require('../config/config');

const verify = {}

verify.verifyToken = (req, res, next) => {

    var token = req.headers['access-token'];
    if(!token) {
        return res.status(403).send({ auth: false, message: 'Usuario non identificado' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            console.log(err.message);
            return res.status(500).send({ auth: false, message: err.message });
        }
        req.userId = decoded.id;
        next();
    })
}

verify.verifyTokenWithoutReturn = (req, res, next) => {

    var token = req.headers['access-token'];
    if(!token) {
        req.userId = undefined;
        next();
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

verify.verifyTokenGet = (req, res) => {

    var token = req.headers['access-token'];
    if(!token) {
        return undefined;
    }
    var userId;
    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(500).send({ auth: false, message: 'Erro interno ao autenticar ao usuario, inténteo de novo.' });
        }
        userId = decoded.id;
    })
    return userId;
}

module.exports = verify;