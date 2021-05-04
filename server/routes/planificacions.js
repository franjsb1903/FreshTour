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

                    for (var i = 0; i < elementos.length; i++) {
                        var elemento = elementos[i];
                        if (elemento.features[0].properties.tipo == "Lugar turístico") {
                            valuesLugares.push(id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                        } else if (elemento.features[0].properties.tipo == "Monumento") {
                            valuesMonumentos.push(id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                        }
                    }
                    if (valuesLugares.length > 0) {
                        var indexLug = 0;
                        for (var i = 0; i < (valuesLugares.length / 4) - 1; i++) {
                            lugares = lugares + "($" + (indexLug + 1) + ", $" + (indexLug + 2) + ", $" + (indexLug + 3) + ", $" + (indexLug + 4) + "), ";
                            indexLug += 4;
                        }
                        lugares = lugares + "($" + (indexLug + 1) + ", $" + (indexLug + 2) + ", $" + (indexLug + 3) + ", $" + (indexLug + 4) + ")";
                    }

                    if (valuesMonumentos.length > 0) {
                        var indexMon = 0;
                        for (var i = 0; i < (valuesMonumentos.length / 4) - 1; i++) {
                            monumentos = monumentos + "($" + (indexMon + 1) + ", $" + (indexMon + 2) + ", $" + (indexMon + 3) + "), $" + (indexMon + 4) + "), ";
                            indexMon += 4;
                        }
                        monumentos = monumentos + "($" + (indexMon + 1) + ", $" + (indexMon + 2) + ", $" + (indexMon + 3) + ", $" + (indexMon + 4) + ")";
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
                                            status: 200,
                                            planificacion: {
                                                id: id
                                            }
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
                                        status: 200,
                                        planificacion: {
                                            id: id
                                        }
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
            values.push(userId);
        } else {
            values.push(-1);
            values.push(-1);
        }

        pool.query(sql.planificacions.all, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos da planificación", err, res);
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
                helpers.onError(500, "Erro obtendo compartindo a planificación", err, res);
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
                helpers.onError(500, "Erro obtendo o elemento da planificación", err, res);
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
                helpers.onError(500, "Erro editando a planificación", err, res);
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

router.get('/sortBy/:type', verify.verifyTokenWithoutReturn, (req, res) => {
    try {
        const userId = req.userId;

        var query;
        const { type } = req.params;

        if (type === "menor_distancia") {
            query = sql.planificacions.sortBy.menorDistancia;
        } else if (type === "maior_distancia") {
            query = sql.planificacions.sortBy.maiorDistancia;
        } else if (type === "maior_tempo_visita") {
            query = sql.planificacions.sortBy.maiorTempoVisita;
        } else if (type === "menor_tempo_visita") {
            query = sql.planificacions.sortBy.menorTempoVisita;
        } else if (type === "maior_tempo_ruta") {
            query = sql.planificacions.sortBy.maiorTempoRuta;
        } else if (type === "menor_tempo_ruta") {
            query = sql.planificacions.sortBy.menorTempoRuta;
        } else if (type === "menor_tempo_total") {
            query = sql.planificacions.sortBy.menorTempoTotalRuta;
        } else if (type === "maior_tempo_total") {
            query = sql.planificacions.sortBy.maiorTempoTotalRuta;
        } else {
            query = sql.planificacions.sortBy.valoracion;
        }

        var values = [];

        if (userId) {
            values.push(userId);
            values.push(userId);
        } else {
            values.push(-1);
            values.push(-1);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro ordeando as planificacións almacenadas", err, res);
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
});

router.get('/fav/sortBy/:type', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;

        var query;
        const { type } = req.params;

        if (type === "menor_distancia") {
            query = sql.planificacions.fav.sortBy.menorDistancia;
        } else if (type === "maior_distancia") {
            query = sql.planificacions.fav.sortBy.maiorDistancia;
        } else if (type === "maior_tempo_visita") {
            query = sql.planificacions.fav.sortBy.maiorTempoVisita;
        } else if (type === "menor_tempo_visita") {
            query = sql.planificacions.fav.sortBy.menorTempoVisita;
        } else if (type === "maior_tempo_ruta") {
            query = sql.planificacions.fav.sortBy.maiorTempoRuta;
        } else if (type === "menor_tempo_ruta") {
            query = sql.planificacions.fav.sortBy.menorTempoRuta;
        } else if (type === "menor_tempo_total") {
            query = sql.planificacions.fav.sortBy.menorTempoTotalRuta;
        } else if (type === "maior_tempo_total") {
            query = sql.planificacions.fav.sortBy.maiorTempoTotalRuta;
        } else {
            query = sql.planificacions.fav.sortBy.valoracion;
        }

        var values = [];

        if (userId) {
            values.push(userId);
            values.push(userId);
        } else {
            values.push(-1);
            values.push(-1);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro ordeando as planificacións favoritas almacenadas", err, res);
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
});

router.get('/:name', verify.verifyTokenWithoutReturn, (req, res) => {
    try {
        const userId = req.userId;
        var values = [];
        if (userId) {
            values.push(userId);
        } else {
            values.push(-1);
        }

        const { name } = req.params;
        const namePerc = '%' + name + '%';
        values.push(namePerc);

        pool.query(sql.planificacions.get, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo a planificación almacenada por nome", err, res);
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
});

module.exports = router;