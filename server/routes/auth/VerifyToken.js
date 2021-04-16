var jwt = require('jsonwebtoken');
var config = require('../../config/config');

function verifyToken(req, res, next) {

    var token = req.headers['access-token'];
    if(!token) {
        return res.status(403).send({ auth: false, message: 'Usuario non identificado' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(500).send({ auth: false, message: 'Erro interno ao autenticar ao usuario, inténteo de novo.' });
        }

        req.userId = decoded.id;
        next();
    })
}

module.exports = verifyToken;