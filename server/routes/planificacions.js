/**
 * @fileoverview Operacións relacionadas coas planificacións
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');                     // Instancia de express
const router = express.Router();                        // Instancia de router, para crear as rutas
const pool = require('../../database/database');        // Instancia para executar queries na BBDD

const verify = require('../lib/VerifyToken');           // Verifica o token de usuario, empregado como middleware
const helpers = require('../lib/helpers');              // Funcións comúns
const sql = require('../lib/sql');                      // Obxecto que reúne as queries a empregar
const tag_traductor = require('../lib/tag_traductor');  // Traductor de etiquetas ao galego

// postNew()
/**
 * Almacena unha nova planificación na base de datos
 */
router.post('/new', verify.verifyToken, async (req, res) => {
    // Conexión ca BBDD
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
        // Almacéns dos elementos que conforman a planificación
        var valuesLugares = [];
        var valuesMonumentos = [];
        var valuesHospedaxe = [];
        var valuesHostalaria = [];
        var valuesOcio = [];
        var valuesOutras = [];
        // Estas variables son necesarias posteriormente para recorrelas con map
        var valuesLugaresWithArrays = [];
        var valuesMonumentosWithArrays = [];
        var valuesHospedaxeWithArrays = [];
        var valuesHostalariaWithArrays = [];
        var valuesOcioWithArrays = [];
        var valuesOutrasWithArrays = [];

        // Lévase a cabo unha transacción con async/await
        // Comezo da transacción
        await client.query('BEGIN');
        // Almacenamento dos datos da planificación
        const resultsOne = await client.query(sql.planificacions.new, [userId, titulo, comentario, isShared, distancia, tempoVisita, tempoRuta]);
        var i = 0;
        // Almacenamento nas variables anteriores dos elementos da planifciación
        await Promise.all(elementos.map(async (elemento) => {
            if (elemento.features[0].properties.tipo == "Lugar turístico") {
                valuesLugares.push(resultsOne.rows[0].id, elemento.features[0].properties.id, i, elemento.features[0].properties.tipo_visita);
                valuesLugaresWithArrays.push([resultsOne.rows[0].id, elemento.features[0].properties.id, i++, elemento.features[0].properties.tipo_visita]);
                // Para cada tipo, se a visita ao elemento é flexible é necesario almacenar este tempo na base de datos
                if (elemento.features[0].properties.isFlexible) {
                    // Almacenamento na táboa de tempos
                    await client.query(sql.planificacions.newTempoLugares, [elemento.features[0].properties.id, elemento.features[0].properties.tipo_visita]);
                    const tempo = await client.query(sql.planificacions.getAVGTempoLugares, [elemento.features[0].properties.id]);
                    // Actualización do tempo flexible sobre o propio elemento na súa táboa
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
                // Se o usuario indicou tempo de visita ao elemento, é necesario almacenalo na base de datos
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
        // Construción da consulta para almacenar os elementos da planificación para cada tipo posible que pode conformala. Xa que non se sabe cantos elementos nin de que tipo, é necesario iterar os arrays que conteñen os datos para construir cada query para cada tipo
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
                if ((indexOcio / 4) < (valuesOcioWithArrays.length) - 1) {
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

        // Unha vez construida cada consulta, para cada tipo execútase a query, se é necesario
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
        // Confirmación dos cambios
        await client.query('COMMIT');
        // Resposta
        return res.status(200).send({
            status: 200,
            planificacion: {
                id: resultsOne.rows[0].id
            }
        });
    } catch (err) {
        // En caso de erro, ROLLBACK
        await client.query('ROLLBACK');
        helpers.onError(500, "Erro interno do servidor", err, res);
    } finally {
        // Cando se finaliza, se pecha a conexión
        client.release();
    }
});

// get()
/**
 * Obtén todas as planificacións almacenadas, indicando as favoritas
 */
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

// postShare()
/**
 * Cambia o estado dunha planificación, pasando de compartida a non compartida ou viceversa
 */
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

// getElements()
/**
 * Obtén os elementos relacionados cunha planificación
 */
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

                // Tradución de etiquetas
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

                // Ordenación dos elementos en función da orde na que foron almacenados polo usuario, xuntando dous arrays distintos, os de turismo e os de lecer
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

// delete()
/**
 * Elimina unha planificación almacenada
 */
router.delete('/', verify.verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { id } = req.body;

        const response = await pool.query('SELECT * FROM fresh_tour.planificacions WHERE id = $1 AND id_usuario = $2', [id, userId]);

        // Comprobación de que a planificación pertence ao usuario que a quere eliminar
        if (response.rowCount == 0) {
            helpers.onErrorAuth(404, "A planificación non é túa", undefined, res);
            return;
        }

        // Conexión ca base de datos
        pool.connect((err, client, done) => {
            /**
             * Comproba se se debe abortar a transacción
             * @param {Object} err 
             * @returns 
             */
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

            // Comezo da transacción
            client.query('BEGIN', err => {
                if (shouldAbort(err)) return;

                // Eliminación da táboa de favoritas
                client.query(sql.planificacions.delete.favoritas, [id], (err, results) => {
                    if (shouldAbort(err)) return;

                    // Eliminación dos comentarios
                    client.query(sql.planificacions.delete.comentarios, [id], (err, results) => {
                        if (shouldAbort(err)) return;

                        // Eliminación da relación con lugares turísticos
                        client.query(sql.planificacions.delete.lugares, [id], (err, results) => {
                            if (shouldAbort(err)) return;

                            // Eliminación da relación con monumentos
                            client.query(sql.planificacions.delete.monumentos, [id], (err, results) => {
                                if (shouldAbort(err)) return;

                                // Eliminación da relación con hospedaxes
                                client.query(sql.planificacions.delete.hospedaxes, [id], (err, results) => {
                                    if (shouldAbort(err)) return;

                                    // Eliminación da relación con hostalaría
                                    client.query(sql.planificacions.delete.hostalaria, [id], (err, results) => {
                                        if (shouldAbort(err)) return;

                                        // Eliminación da relación con ocio
                                        client.query(sql.planificacions.delete.ocio, [id], (err, results) => {
                                            if (shouldAbort(err)) return;

                                            // Eliminación da relación con outras
                                            client.query(sql.planificacions.delete.outras, [id], (err, results) => {
                                                if (shouldAbort(err)) return;

                                                // Eliminación da propia planificación
                                                client.query(sql.planificacions.delete.planificacion, [id, userId], (err, results) => {
                                                    if (shouldAbort(err)) return;

                                                    // Confirmación dos cambios
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

// postEdit()
/**
 * Edición dunha planificación
 */
router.post('/edit', verify.verifyToken, async (req, res) => {
    try {

        const userId = req.userId;
        const { titulo, comentario, id } = req.body;

        if (!titulo || !comentario || !id || titulo.length < 1 || titulo.length == 0 || titulo == '') {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const response = await pool.query('SELECT * FROM fresh_tour.planificacions WHERE id = $1 AND id_usuario = $2', [id, userId]);

        // Comprobación de se a planificación pertence ao usuario
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

// getSortBy()
/**
 * Ordenación das planificacións dun determinado modo, indicando as favoritas
 */
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

// getFavSortBy()
/**
 * Ordenación das planificacións favoritas dun determinado modo
 */
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

// getByName()
/**
 * Obtención de planificacións por nome, indicando as favoritas
 */
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

// postFav()
/**
 * Engade unha planificación como favorita
 */
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

// deleteFav()
/**
 * Quita unha planificación como favorita
 */
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