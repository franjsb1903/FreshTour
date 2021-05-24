const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const sql = require('../lib/sql');
const tag_traductor = require('../lib/tag_traductor');

router.post('/new', verify.verifyToken, async (req, res) => {
    const client = await pool.connect();
    try {

        const userId = req.userId;

        const { titulo, comentario, isShared, elementos, distancia, tempoVisita, tempoRuta } = req.body;

        var lugares = sql.planificacions.newLugares;
        var monumentos = sql.planificacions.newMonumentos;
        var hospedaxes = sql.planificacions.newHospedaxe;
        var hostalaria = sql.planificacions.newHostalaria;
        var ocio = sql.planificacions.newOcio;
        var outras = sql.planificacions.newOutras;
        var valuesLugares = [];
        var valuesMonumentos = [];
        var valuesHospedaxe = [];
        var valuesHostalaria = [];
        var valuesOcio = [];
        var valuesOutras = [];
        var valuesLugaresWithArrays = [];
        var valuesMonumentosWithArrays = [];
        var valuesHospedaxeWithArrays = [];
        var valuesHostalariaWithArrays = [];
        var valuesOcioWithArrays = [];
        var valuesOutrasWithArrays = [];

        await client.query('BEGIN');
        const resultsOne = await client.query(sql.planificacions.new, [userId, titulo, comentario, isShared, distancia, tempoVisita, tempoRuta]);
        var i = 0;
        await Promise.all(elementos.map(async (elemento) => {
            if (elemento.features[0].properties.tipo == "Lugar turístico") {
                valuesLugares.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesLugaresWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.isFlexible) {
                    await client.query(sql.planificacions.newTempoLugares, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                    const tempo = await client.query(sql.planificacions.getAVGTempoLugares, [elemento.features[0].properties.id]);
                    await client.query(sql.planificacions.updateTempoLugares, [tempo.rows[0].tempo, elemento.features[0].properties.id]);
                }
            } else if (elemento.features[0].properties.tipo == "Monumento") {
                valuesMonumentos.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesMonumentosWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.isFlexible) {
                    await client.query(sql.planificacions.newTempoMonumentos, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                    const tempo = await client.query(sql.planificacions.getAVGTempoMonumentos, [elemento.features[0].properties.id]);
                    await client.query(sql.planificacions.updateTempoMonumentos, [tempo.rows[0].tempo, elemento.features[0].properties.id]);
                }
            } else if (elemento.features[0].properties.tipo == "Hospedaxe") {
                valuesHospedaxe.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesHospedaxeWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.tipo_visita) {
                    await client.query(sql.planificacions.newTempoHospedaxe, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                }
            } else if (elemento.features[0].properties.tipo == "Hostalaría") {
                valuesHostalaria.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesHostalariaWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.tipo_visita) {
                    await client.query(sql.planificacions.newTempoHostalaria, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                }
            } else if (elemento.features[0].properties.tipo == "Ocio") {
                valuesOcio.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesOcioWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.tipo_visita) {
                    await client.query(sql.planificacions.newTempoOcio, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                }
            } else if (elemento.features[0].properties.tipo == "Outra") {
                valuesOutras.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesOutrasWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                if (elemento.features[0].properties.tipo_visita) {
                    await client.query(sql.planificacions.newTempoOutras, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                }
            }
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
        var indexHosta = 0;
        if (valuesHostalaria.length > 0) {
            await Promise.all(valuesHostalariaWithArrays.map(e => {
                if ((indexHosta / 4) < (valuesHostalariaWithArrays.length) - 1) {
                    hostalaria = hostalaria + "($" + (indexHosta + 1) + ", $" + (indexHosta + 2) + ", $" + (indexHosta + 3) + ", $" + (indexHosta + 4) + "), ";
                } else {
                    hostalaria = hostalaria + "($" + (indexHosta + 1) + ", $" + (indexHosta + 2) + ", $" + (indexHosta + 3) + ", $" + (indexHosta + 4) + ")";
                    return;
                }
                indexHosta += 4;
            }));
        }
        var indexOcio = 0;
        if (valuesOcio.length > 0) {
            await Promise.all(valuesOcioWithArrays.map(e => {
                if ((indexHosta / 4) < (valuesOcioWithArrays.length) - 1) {
                    ocio = ocio + "($" + (indexOcio + 1) + ", $" + (indexOcio + 2) + ", $" + (indexOcio + 3) + ", $" + (indexOcio + 4) + "), ";
                } else {
                    ocio = ocio + "($" + (indexOcio + 1) + ", $" + (indexOcio + 2) + ", $" + (indexOcio + 3) + ", $" + (indexOcio + 4) + ")";
                    return;
                }
                indexOcio += 4;
            }));
        }
        var indexOutras = 0;
        if (valuesOutras.length > 0) {
            await Promise.all(valuesOutrasWithArrays.map(e => {
                if ((indexOutras / 4) < (valuesOutrasWithArrays.length) - 1) {
                    outras = outras + "($" + (indexOutras + 1) + ", $" + (indexOutras + 2) + ", $" + (indexOutras + 3) + ", $" + (indexOutras + 4) + "), ";
                } else {
                    outras = outras + "($" + (indexOutras + 1) + ", $" + (indexOutras + 2) + ", $" + (indexOutras + 3) + ", $" + (indexOutras + 4) + ")";
                    return;
                }
                indexOutras += 4;
            }));
        }

        if (valuesLugares.length > 0) {
            await client.query(lugares, valuesLugares);
        }
        if (valuesMonumentos.length > 0) {
            await client.query(monumentos, valuesMonumentos);
        }
        if (valuesHospedaxe.length > 0) {
            await client.query(hospedaxes, valuesHospedaxe);
        }
        if (valuesHostalaria.length > 0) {
            await client.query(hostalaria, valuesHostalaria);
        }
        if (valuesOcio.length > 0) {
            await client.query(ocio, valuesOcio);
        }
        if (valuesOutras.length > 0) {
            await client.query(outras, valuesOutras);
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

        if (isShare == undefined || id == undefined) {
            helpers.onError(500, "Erro obtendo compartindo a planificación", undefined, res);
            return;
        }

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

        if (id == undefined) {
            helpers.onError(500, "Erro obtendo o elemento da planificación", undefined, res);
            return;
        }

        pool.query(sql.planificacions.elementos, [id], (err, turismo) => {
            if (err) {
                helpers.onError(500, "Erro obtendo o elemento da planificación", err, res);
                return;
            }
            pool.query(sql.planificacions.lecer, [id], (err, lecer) => {
                if (err) {
                    helpers.onError(500, "Erro obtendo o elemento da planificación", err, res);
                    return;
                }
                var elements = [], indexTurismo = 0, indexLecer = 0;

                lecer.rows.map(lecerItem => {
                    if (lecerItem.tipo == "Ocio") {
                        lecerItem.sub_tag = tag_traductor.ocio(lecerItem.sub_tag);
                    } else if (lecerItem.tipo == "Hostalaría") {
                        lecerItem.sub_tag = tag_traductor.hostalaria(lecerItem.sub_tag);
                    } else if (lecerItem.tipo == "Hospedaxe") {
                        lecerItem.sub_tag = tag_traductor.hospedaxe(lecerItem.sub_tag);
                    } else if (lecerItem.tipo == "Outra") {
                        lecerItem.sub_tag = tag_traductor.outras(lecerItem.sub_tag);
                    }
                })

                while (indexTurismo < turismo.rowCount && indexLecer < lecer.rowCount) {
                    if ((turismo.rows[indexTurismo].posicion_visita - lecer.rows[indexLecer].posicion_visita) < 0) {
                        elements.push(turismo.rows[indexTurismo++]);
                    } else {
                        elements.push(lecer.rows[indexLecer++]);
                    }
                }

                if (indexLecer < lecer.rowCount) {
                    elements = elements.concat(lecer.rows.slice(indexLecer));
                } else {
                    elements = elements.concat(turismo.rows.slice(indexTurismo));
                }

                res.status(200).json({
                    status: 200,
                    elementos: elements
                });
            })
        });

    } catch (err) {
        helpers.onError(500, "Erro interno no servidor", err, res);
        return;
    }
});

router.delete('/', verify.verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        const response = await pool.query('SELECT * FROM fresh_tour.planificacions WHERE id = $1 AND id_usuario = $2', [id, userId]);

        if (response.rowCount == 0) {
            helpers.onErrorAuth(404, "A planificación non é túa", undefined, res);
            return;
        }

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

                                    client.query(sql.planificacions.delete.hostalaria, [id], (err, results) => {
                                        if (shouldAbort(err)) return;

                                        client.query(sql.planificacions.delete.ocio, [id], (err, results) => {
                                            if (shouldAbort(err)) return;

                                            client.query(sql.planificacions.delete.outras, [id], (err, results) => {
                                                if (shouldAbort(err)) return;

                                                client.query(sql.planificacions.delete.planificacion, [id, userId], (err, results) => {
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
                                            })
                                        })
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

        const userId = req.userId;
        const { titulo, comentario, id } = req.body;

        if (!titulo || !comentario || !id || titulo.length < 1 || titulo.length == 0 || titulo == '') {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const response = await pool.query('SELECT * FROM fresh_tour.planificacions WHERE id = $1 AND id_usuario = $2', [id, userId]);

        if (response.rowCount == 0) {
            helpers.onErrorAuth(404, "A planificación non é túa", undefined, res);
            return;
        }

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

router.post('/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const planificacion = sql.elementos.favs.new.planificacions;

        helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.delete('/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }
        const planificacion = sql.elementos.favs.delete.planificacions;

        helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

module.exports = router;