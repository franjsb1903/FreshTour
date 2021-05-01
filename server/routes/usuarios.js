var express = require('express');
var router = express.Router();

const helpers = require('../lib/helpers');
var bcrypt = require('bcryptjs');
const pool = require('../../database/database');
const verify = require('../lib/VerifyToken');
const sql = require('../lib/sql');

router.post('/turismo/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const lugar_turistico = "INSERT INTO fresh_tour.lugares_turisticos_favoritos (id_usuario, id_lugar_turistico) values ($1, $2)";
        const monumento = "INSERT INTO fresh_tour.monumentos_favoritos (id_usuario, id_monumento) values ($1, $2)";
        const planificacion = "INSERT INTO fresh_tour.planificacions_favoritas (id_usuario, id_planificacion) values ($1, $2)";

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        } else {
            helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.delete('/turismo/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        const lugar_turistico = "DELETE FROM fresh_tour.lugares_turisticos_favoritos WHERE id_usuario = $1 and id_lugar_turistico = $2";
        const monumento = "DELETE FROM fresh_tour.monumentos_favoritos WHERE id_usuario = $1 and id_monumento = $2";
        const planificacion = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_usuario = $1 and id_planificacion = $2";

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        } else {
            helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.get('/turismo/fav/', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;

        const elementos_favoritos = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1)";
        pool.query(elementos_favoritos, [userId], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/turismo/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        const elementos_favoritos = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) and titulo LIKE $2 UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1) and titulo LIKE $2";
        pool.query(elementos_favoritos, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.post('/edit', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;
        const { usuario, nome, apelidos, email, contrasinal } = req.body;

        var hashedPssw = bcrypt.hashSync(contrasinal, 10);

        const values = [usuario, nome, apelidos, email, hashedPssw, userId];

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

                client.query(sql.usuarios.exists, [usuario, email], (err, results) => {
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

                    client.query(sql.usuarios.edit, values, (err, results) => {
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

                                done();

                                return res.status(200).send({ auth: true, user: user, status: 200 });

                            } catch (err) {
                                helpers.onErrorAuth(500, "Erro interno do servidor, tenteo de novo", err, res);
                                return;
                            }
                        })
                    });
                });
            })
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.delete('/', verify.verifyToken, async (req, res) => {
    
    const client = await pool.connect();
    try {

        const userId = req.userId;

        await client.query(sql.usuarios.delete.lugaresFav, [userId]);
        await client.query(sql.usuarios.delete.monumentosFav, [userId]);
        await client.query(sql.usuarios.delete.planificacionsFav, [userId]);
        const lugares = await client.query(sql.usuarios.delete.comentariosLugares, [userId]);
        await Promise.all(lugares.rows.map(async (item) => {
            const results = await client.query(sql.elementos.updateValoracion.mediaLugares, [item.id_lugar_turistico]);
            await client.query(sql.elementos.updateValoracion.updateLugares, [results.rows[0].media, item.id]);
        }));
        const monumentos = await client.query(sql.usuarios.delete.comentariosMonumentos, [userId]);
        await Promise.all(monumentos.rows.map(async (item) => {
            const results = await client.query(sql.elementos.updateValoracion.mediaMonumentos, [item.id_monumento]);
            await client.query(sql.elementos.updateValoracion.updateMonumentos, [results.rows[0].media, item.id]);
        }));
        await client.query(sql.usuarios.delete.comentariosPlanificacions, [userId]);
        const response = await client.query(sql.usuarios.delete.planificacionsId, [userId]);
        await Promise.all(response.rows.map(async (item) => {
            await client.query(sql.planificacions.delete.lugares, [item.id]);
            await client.query(sql.planificacions.delete.monumentos, [item.id]);
            await client.query(sql.planificacions.delete.planificacion, [item.id]);
        }));
        await client.query(sql.usuarios.delete.user, [userId]);
        await client.query('COMMIT');

        return res.status(200).send({ auth: false, status: 200 });
    } catch (err) {
        await client.query('ROLLBACK');
        helpers.onError(500, "Erro interno do servidor", err, res);
    } finally {
        client.release();
    }
})

module.exports = router;