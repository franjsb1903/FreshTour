const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const sql = require('../lib/sql');

router.post('/new', verify.verifyToken, (req, res) => {
    try {

        const userId = req.userId;

        const { titulo, comentario, isShared, elementos, distancia, tempoVisita, tempoRuta } = req.body;

        var lugares = sql.planificacions.newLugares;
        var monumentos = sql.planificacions.newMonumentos;
        var valuesLugares = [];
        var valuesMonumentos = [];

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

                client.query(sql.planificacions.new, [userId, titulo, comentario, isShared, distancia, tempoVisita, tempoRuta], (err, results) => {
                    if (shouldAbort(err)) return;

                    const { id } = results.rows[0];

                    var index = 0;
                    for (var i = 0; i < elementos.length; i++) {
                        var elemento = elementos[i];
                        if (elemento.features[0].properties.tipo == "Lugar turístico") {
                            if (i < elementos.length - 1) {
                                lugares = lugares + "($" + (index + 1) + ", $" + (index + 2) + ", $" + (index + 3) + "),"
                            } else {
                                lugares = lugares + "($" + (index + 1) + ", $" + (index + 2) + ", $" + (index + 3) + ")"
                            }
                            valuesLugares.push(id, elemento.features[0].properties.id, i);
                        } else if (elemento.features[0].properties.tipo == "Monumento") {
                            if (i < elementos.length - 1) {
                                monumentos = monumentos + "($" + (index + 1) + ", $" + (index + 2) + ", $" + (index + 3) + "),"
                            } else {
                                monumentos = monumentos + "($" + (index + 1) + ", $" + (index + 2) + ", $" + (index + 3) + ")"
                            }
                            valuesMonumentos.push(id, elemento.features[0].properties.id, i);
                        }
                        index += 3;
                    }

                    if (valuesMonumentos.length > 0 && valuesLugares.length > 0) {
                        client.query(lugares, valuesLugares, (err, results) => {
                            if (shouldAbort(err)) return;

                            client.query(monumentos, valuesMonumentos, (err, results) => {
                                if (shouldAbort(err)) return;

                                client.query('COMMIT', error => {
                                    if (error) {
                                        helpers.onError(500, "Erro interno no servidor", error, res);
                                        return;
                                    }
                                    try {
                                        done();
                                        return res.status(200).send({
                                            status: 200
                                        });
                                    } catch (err) {
                                        helpers.onError(500, "Erro interno no servidor", err, res);
                                        return;
                                    }
                                })
                            })

                        });
                    } else {
                        var query;
                        var values;
                        if (valuesLugares.length > 0) {
                            query = lugares;
                            values = valuesLugares.map(e => e);
                        } else {
                            query = monumentos;
                            values = valuesMonumentos.map(e => e);
                        }

                        client.query(query, values, (err, results) => {
                            if (shouldAbort(err)) return;

                            client.query('COMMIT', error => {
                                if (error) {
                                    helpers.onError(500, "Erro interno no servidor", error, res);
                                    return;
                                }
                                try {
                                    done();
                                    return res.status(200).send({
                                        status: 200
                                    });
                                } catch (err) {
                                    helpers.onError(500, "Erro interno no servidor", err, res);
                                    return;
                                }
                            })
                        })
                    }

                });
            })
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/', verify.verifyTokenWithoutReturn, (req, res) => {
    try {
        const userId = req.userId;
        var values = [];

        if (userId) {
            values.push(userId);
        } else {
            values.push(-1);
        }

        pool.query(sql.planificacions.all, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo as planificacións almacenadas", err, res);
                return;
            }
            res.status(200).json({
                planificacions: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }
})

router.post('/share', verify.verifyToken, (req, res) => {

    try {
        const { isShare, id } = req.body;

        pool.query(sql.planificacions.share, [isShare, id], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo as planificacións almacenadas", err, res);
                return;
            }
            res.status(200).json({
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }

});

router.get('/elements/:id', (req, res) => {

    try {

        const { id } = req.params;

        pool.query(sql.planificacions.elementos, [id], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo as planificacións almacenadas", err, res);
                return;
            }
            res.status(200).json({
                status: 200,
                elementos: results.rows
            });
        });

    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }
});

router.delete('/', verify.verifyToken, (req, res) => {
    try {
        const { id } = req.body;

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

                client.query(sql.planificacions.delete.favoritas, [id], (err, results) => {
                    if (shouldAbort(err)) return;

                    client.query(sql.planificacions.delete.comentarios, [id], (err, results) => {
                        if (shouldAbort(err)) return;

                        client.query(sql.planificacions.delete.lugares, [id], (err, results) => {
                            if (shouldAbort(err)) return;

                            client.query(sql.planificacions.delete.monumentos, [id], (err, results) => {
                                if (shouldAbort(err)) return;

                                client.query(sql.planificacions.delete.planificacion, [id], (err, results) => {
                                    if (shouldAbort(err)) return;

                                    client.query('COMMIT', error => {
                                        if (error) {
                                            helpers.onError(500, "Erro interno no servidor", error, res);
                                            return;
                                        }
                                        try {
                                            done();
                                            return res.status(200).send({
                                                status: 200
                                            });
                                        } catch (err) {
                                            helpers.onError(500, "Erro interno no servidor", err, res);
                                            return;
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }
});

router.post('/edit', verify.verifyToken, (req, res) => {
    try {

        const { titulo, comentario, id } = req.body;

        pool.query(sql.planificacions.edit, [titulo, comentario, id], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo as planificacións almacenadas", err, res);
                return;
            }
            res.status(200).json({
                status: 200
            });
        });

    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }
});

module.exports = router;