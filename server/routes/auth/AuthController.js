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

    const query = "INSERT INTO fresh_tour.usuarios (usuario, nome, apelidos, email, contrasinal, data) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) RETURNING usuario, nome, apelidos, email, to_char(data, 'DD-MM-YY') as data";
    const values = [usuario, nome, apelidos, email, hashedPssw];

    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                client.query('ROLLBACK', err => {
                    if (err) {
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

                    client.query('COMMIT', err => {
                        if (err) {
                            helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
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

                            const token = jwt.sign({ id: user.id }, config.secret, {
                                expiresIn: 86400
                            });

                            helpers.onCorrectAuth(token, user, res, [], [], [], []);

                            done();
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

    const query = "SELECT id, usuario, nome, apelidos, email, data, contrasinal, to_char(data, 'DD-MM-YY') as data FROM fresh_tour.usuarios WHERE usuario LIKE $1 OR email LIKE $1";

    const elementos_favoritos = "SELECT *, 'Monumento' as tipo FROM fresh_tour.monumentos m where id = ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turistico' as tipo FROM fresh_tour.lugares_turisticos lt WHERE id = ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1)"
    const plan_fav = "SELECT * FROM fresh_tour.planificacions p2 WHERE id = ( SELECT id_planificacion FROM fresh_tour.planificacions_favoritas pf WHERE id_usuario = $1)"
    const opinions = "SELECT id, id_usuario, titulo, data, valoracion, comentario, id_lugar_turistico as id,'Lugar turistico' as tipo FROM fresh_tour.comentarios_valoracions_lugares_turisticos cvlt WHERE id_usuario = $1 UNION ALL select id, id_usuario, titulo, data, valoracion, comentario, id_monumento as id, 'Monumento' as tipo FROM fresh_tour.comentarios_valoracions_monumentos cvm WHERE id_usuario = $1 UNION ALL select id, id_usuario, titulo, data, valoracion, comentario, id_planificacion as id, 'Planificacion' as tipo FROM fresh_tour.comentarios_valoracions_planificacions cvp WHERE id_usuario = $1"
    const plansUsuario = "SELECT * FROM fresh_tour.planificacions p WHERE id_usuario = $1"

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
            } else {
                elementosFavArray = elementos.rows;
            }

            pool.query(plan_fav, [user.id], (err, planificacions) => {
                var planificacionsFavArray;

                if (err) {
                    helpers.onErrorAuth(500, "Erro obtendo as planificacions favoritas do usuario", err, res);
                } else {
                    planificacionsFavArray = planificacions.rows;
                }

                pool.query(opinions, [user.id], (err, opinions) => {
                    var opinionsArray;

                    if (err) {
                        helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
                    } else {
                        opinionsArray = opinions.rows;
                    }

                    pool.query(plansUsuario, [user.id], (err, plans) => {
                        var plansArray;

                        if (err) {
                            helpers.onErrorAuth(500, "Erro obtendo as opinions do usuario", err, res);
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