const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const sql = require('../lib/sql');

router.post('/new', verify.verifyToken, async (req, res) => {
    const client = await pool.connect();
    try {

        const userId = req.userId;

        const { titulo, comentario, isShared, elementos, distancia, tempoVisita, tempoRuta } = req.body;

        var lugares = sql.planificacions.newLugares;
        var monumentos = sql.planificacions.newMonumentos;
        var hospedaxes = sql.planificacions.newHospedaxe;
        var valuesLugares = [];
        var valuesMonumentos = [];
        var valuesHospedaxe = [];
        var valuesLugaresWithArrays = [];
        var valuesMonumentosWithArrays = [];
        var valuesHospedaxeWithArrays = [];

        await client.query('BEGIN');
        const resultsOne = await client.query(sql.planificacions.new, [userId, titulo, comentario, isShared, distancia, tempoVisita, tempoRuta]);
        var i = 0;
        console.log(elementos.length);
        await Promise.all(elementos.map((elemento) => {
            if (elemento.features[0].properties.tipo == "Lugar turístico") {
                valuesLugares.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesLugaresWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita]);
            } else if (elemento.features[0].properties.tipo == "Monumento") {
                valuesMonumentos.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesMonumentosWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita]);
            } else if (elemento.features[0].properties.tipo == "Hospedaxe") {
                valuesHospedaxe.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesHospedaxeWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita]);
            }
            i++;
            console.log("venga");
        }));
        var indexLug = 0;
        if (valuesLugares.length > 0) {
            await Promise.all(valuesLugaresWithArrays.map(e => {
                if ((indexLug / 4) < (valuesLugaresWithArrays.length) - 1) {
                    lugares = lugares + "($" + (indexLug + 1) + ", $" + (indexLug + 2) + ", $" + (indexLug + 3) + ", $" + (indexLug + 4) + "), ";
                } else {
                    lugares = lugares + "($" + (indexLug + 1) + ", $" + (indexLug + 2) + ", $" + (indexLug + 3) + ", $" + (indexLug + 4) + ")";
                    return;
                }
                indexLug += 4;
            }));
        }
        var indexMon = 0;
        if (valuesMonumentos.length > 0) {
            await Promise.all(valuesMonumentosWithArrays.map(e => {
                if ((indexMon / 4) < (valuesMonumentosWithArrays.length) - 1) {
                    monumentos = monumentos + "($" + (indexMon + 1) + ", $" + (indexMon + 2) + ", $" + (indexMon + 3) + ", $" + (indexMon + 4) + "), ";
                } else {
                    monumentos = monumentos + "($" + (indexMon + 1) + ", $" + (indexMon + 2) + ", $" + (indexMon + 3) + ", $" + (indexMon + 4) + ")";
                    return;
                }
                indexMon += 4;
            }));
        }
        var indexHos = 0;
        if (valuesHospedaxe.length > 0) {
            await Promise.all(valuesHospedaxeWithArrays.map(e => {
                if ((indexHos / 4) < (valuesHospedaxeWithArrays.length) - 1) {
                    hospedaxes = hospedaxes + "($" + (indexHos + 1) + ", $" + (indexHos + 2) + ", $" + (indexHos + 3) + ", $" + (indexHos + 4) + "), ";
                } else {
                    hospedaxes = hospedaxes + "($" + (indexHos + 1) + ", $" + (indexHos + 2) + ", $" + (indexHos + 3) + ", $" + (indexHos + 4) + ")";
                    return;
                }
                indexHos += 4;
            }));
        }
        if (valuesLugares.length > 0) {
            console.log(lugares);
            await client.query(lugares, valuesLugares);
        }
        if (valuesMonumentos.length > 0) {
            console.log(monumentos);
            await client.query(monumentos, valuesMonumentos);
        }
        if (valuesHospedaxe.length > 0) {
            console.log(hospedaxes);
            await client.query(hospedaxes, valuesHospedaxe);
        }
        await client.query('COMMIT');
        return res.status(200).send({
            status: 200,
            planificacion: {
                id: resultsOne.rows[0].id
            }
        });
    } catch (err) {
        await client.query('ROLLBACK');
        helpers.onError(500, "Erro interno do servidor", err, res);
    } finally {
        client.release();
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

                                client.query(sql.planificacions.delete.hospedaxes, [id], (err, results) => {
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