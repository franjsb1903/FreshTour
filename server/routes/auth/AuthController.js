var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/config');

const helpers = require('../../lib/helpers');
const sql = require('../../lib/sql');
const pool = require('../../../database/database');

var verify = require('../../lib/VerifyToken');

router.post('/register', (req, res) => {

    const { usuario, nome, apelidos, email, contrasinal } = req.body;

    var hashedPssw = bcrypt.hashSync(contrasinal, 10);

    const queryDuplicateUser = sql.usuarios.exists;

    const query = sql.usuarios.new;
    const values = [usuario, nome, apelidos, email, hashedPssw];

    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                client.query('ROLLBACK', error => {
                    if (error) {
                        helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                        return;
                    }

                    done()
                    helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                    return;
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
                        helpers.onErrorAuth(401, "Email xa rexistrado na plataforma", err, res);
                        return;
                    } else if (usuario == results.rows[0].usuario) {
                        helpers.onErrorAuth(401, "Nome de usuario xa existente", err, res);
                        return;
                    }
                }

                client.query(query, values, (err, results) => {
                    if (shouldAbort(err)) return;

                    client.query('COMMIT', error => {
                        if (error) {
                            helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", error, res);
                            return;
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

                            var token = jwt.sign({ id: user.id }, config.secret, {
                                expiresIn: 86400
                            });

                            done();

                            helpers.onCorrectAuth(token, user, res, [], [], [], []);

                        } catch (err) {
                            helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                            return;
                        }
                    })
                });
            });
        })
    });
});

router.post('/login', (req, res) => {
    const { usuario, contrasinal } = req.body;

    const query = sql.usuarios.get.user;

    const elementos_favoritos = sql.usuarios.get.elementosFav
    const plan_fav = sql.usuarios.get.plansFav;
    const opinions = sql.usuarios.get.opinions;
    const plansUsuario = sql.usuarios.get.plans;

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

        var passwordIsValid = bcrypt.compareSync(contrasinal, user.contrasinal);
        if (!passwordIsValid) {
            helpers.onErrorAuth(401, "Contrasinal incorrecto", undefined, res);
            return;
        }
        delete user.contrasinal;
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400
        });
        pool.query(elementos_favoritos, [user.id], (err, elementos) => {
            var elementosFavArray;

            if (err) {
                helpers.onErrorAuth(500, "Erro obtendo os elementos favoritos do usuario", err, res);
                elementosFavArray = [];
            } else {
                elementosFavArray = elementos.rows;
            }

            pool.query(plan_fav, [user.id], (err, planificacions) => {
                var planificacionsFavArray;

                if (err) {
                    helpers.onErrorAuth(500, "Erro obtendo as planificacions favoritas do usuario", err, res);
                    planificacionsFavArray = [];
                } else {
                    planificacionsFavArray = planificacions.rows;
                }

                pool.query(opinions, [user.id], (err, opinions) => {
                    var opinionsArray;

                    if (err) {
                        helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                        opinionsArray = [];
                    } else {
                        opinionsArray = opinions.rows;
                    }

                    pool.query(plansUsuario, [user.id], (err, plans) => {
                        var plansArray;

                        if (err) {
                            helpers.onErrorAuth(500, "Erro obtendo os plans do usuario", err, res);
                            plansArray = [];
                        } else {
                            plansArray = plans.rows;
                        }

                        helpers.onCorrectAuth(token, user, res, planificacionsFavArray, plansArray, opinionsArray, elementosFavArray);
                    })
                });
            });

        })
    })
})

router.get('/me', verify.verifyToken, (req, res) => {

    const userId = req.userId;

    const query = sql.usuarios.get.byId;

    const elementos_favoritos = sql.usuarios.get.elementosFav
    const plan_fav = sql.usuarios.get.plansFav;
    const opinions = sql.usuarios.get.opinions;
    const plansUsuario = sql.usuarios.get.plans;
    
    pool.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
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

        var user = results.rows[0];

        pool.query(elementos_favoritos, [user.id], (err, elementos) => {
            var elementosFavArray;

            if (err) {
                helpers.onErrorAuth(500, "Erro obtendo os elementos favoritos do usuario", err, res);
                return;
            } else {
                elementosFavArray = elementos.rows;
            }

            pool.query(plan_fav, [user.id], (err, planificacions) => {
                var planificacionsFavArray;

                if (err) {
                    helpers.onErrorAuth(500, "Erro obtendo as planificacions favoritas do usuario", err, res);
                    return;
                } else {
                    planificacionsFavArray = planificacions.rows;
                }

                pool.query(opinions, [user.id], (err, opinions) => {
                    var opinionsArray;

                    if (err) {
                        helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                        return;
                    } else {
                        opinionsArray = opinions.rows;
                    }

                    pool.query(plansUsuario, [user.id], (err, plans) => {
                        var plansArray;

                        if (err) {
                            helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                            return;
                        } else {
                            plansArray = plans.rows;
                        }

                        helpers.onCorrectAuth(undefined, user, res, planificacionsFavArray, plansArray, opinionsArray, elementosFavArray);
                    })
                });
            });

        })
    });

});

module.exports = router;