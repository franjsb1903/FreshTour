var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');

const helpers = require('../../lib/helpers');

const pool = require('../../../database/database');

var VerifyToken = require('./VerifyToken');

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

router.post('/register', (req, res) => {

    const { usuario, nome, apelidos, email, contrasinal } = req.body;

    var hashedPssw = bcrypt.hashSync(contrasinal, 10);

    const queryDuplicateUser = 'SELECT usuario, email FROM fresh_tour.usuarios WHERE usuario LIKE $1 OR email LIKE $2';

    const query = 'INSERT INTO fresh_tour.usuarios (usuario, nome, apelidos, email, contrasinal, data) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING *';
    const values = [usuario, nome, apelidos, email, hashedPssw];

    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                client.query('ROLLBACK', err => {
                    if (err) {
                        return res.status(500).json({
                            status: 500,
                            message: "Erro interno do servidor, tenteo de novo",
                            auth: false
                        });
                    }
                    // release the client back to the pool
                    done()
                    return res.status(500).json({
                        status: 500,
                        message: "Erro interno do servidor, tenteo de novo",
                        auth: false
                    });
                })
            }
            return !!err
        }

        client.query('BEGIN', err => {
            if (shouldAbort(err)) return;

            client.query(queryDuplicateUser, [usuario, email], (err, results) => {
                if (shouldAbort(err)) return;

                if (results.rowCount > 0) {
                    if (email == results.rows[0].email) {
                        return res.status(401).send({
                            auth: false,
                            token: null,
                            message: "Email xa rexistrado na plataforma"
                        });
                    } else if (usuario == results.rows[0].usuario) {
                        return res.status(401).send({
                            auth: false,
                            token: null,
                            message: "Nome de usuario xa existente"
                        });
                    }
                }

                client.query(query, values, (err, results) => {
                    if (shouldAbort(err)) return;

                    client.query('COMMIT', err => {
                        if (err) {
                            return res.status(500).json({
                                status: 500,
                                message: "Erro interno do servidor, tenteo de novo",
                                auth: false
                            });
                        }
                        try {
                            const { id, usuario, nome, apelidos, email, data } = results.rows[0];

                            const user = {
                                id: id,
                                usuario: usuario,
                                nome: nome,
                                apelidos: apelidos,
                                email: email,
                                data: data
                            }

                            const token = jwt.sign({ id: user.id }, config.secret, {
                                expiresIn: 86400
                            });

                            res.status(200).send({ auth: true, token: token, user: user });

                            done();
                        } catch (err) {
                            console.log(err);
                            return res.status(500).json({
                                status: 500,
                                message: "Erro interno do servidor, tenteo de novo",
                                auth: false
                            });
                        }
                    })
                });
            });
        })
    });
});

router.post('/login', (req, res) => {
    const { usuario, contrasinal } = req.body;

    const query = "SELECT usuario, nome, apelidos, email, data, contrasinal FROM fresh_tour.usuarios WHERE usuario LIKE $1 OR email LIKE $1";

    pool.query(query, [usuario], (err, results) => {
        if (err) {
            helpers.onErrorAuth(500, "Erro autenticando ao usuario", err, res);
            return;
        }
        if (results.rowCount == 0) {
            helpers.onErrorAuth(404, "Usuario non atopado", undefined, res);
            return;
        }
        
        var user = results.rows[0];
        console.log(user);

        var passwordIsValid = bcrypt.compareSync(contrasinal, user.contrasinal);
        if (!passwordIsValid) {
            helpers.onErrorAuth(401, "Contrasinal incorrecto", undefined, res);
            return;
        }
        delete user.contrasinal;
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });

        helpers.onCorrectAuth(token, user, res);
    })
})

router.get('/me', VerifyToken, (req, res) => {

    const userId = req.userId;

    const query = "SELECT usuario, nome, apelidos, email, data FROM fresh_tour.usuarios WHERE id = $1";

    pool.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                message: "Erro buscando o usuario"
            });
        }
        if (results.rowCount == 0) {
            return res.status(404).json({
                status: 404,
                message: "Usuario non atopado"
            });
        }
        res.status(200).json({
            user: results.rows[0],
            status: 200
        });
    });

});

module.exports = router;