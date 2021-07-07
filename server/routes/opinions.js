/**
 * @fileoverview Operacións relacionadas coas opinións
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');                 // Instancia de express
const router = express.Router();                    // Instancia de router, para crear as rutas
const pool = require('../../database/database');    // Instancia para executar queries na BBDD
const sql = require('../lib/sql');                  // Obxecto coas queries a empregar
const verify = require('../lib/VerifyToken');       // Verifica o token de usuario, empregado como middleware
const helpers = require('../lib/helpers');          // Funcións comúns

// get()
/**
 * Obtén as opinións dun determinado elemento dun determinado tipo
 */
router.get('/:type/:id', async (req, res) => {

    try {
        const { type, id } = req.params;
        
        if (type === "Lugar turístico") {
            onSearch(sql.opinions.get.lugares.get, sql.opinions.get.lugares.count_valoracion, id, res);
        } else if (type === "Monumento") {
            onSearch(sql.opinions.get.monumentos.get, sql.opinions.get.monumentos.count_valoracion, id, res);
        } else if (type === "Planificación") {
            onSearch(sql.opinions.get.planificacions.get, sql.opinions.get.planificacions.count_valoracion, id, res);
        } else if (type === "Hospedaxe") {
            onSearch(sql.opinions.get.hospedaxe.get, sql.opinions.get.hospedaxe.count_valoracion, id, res);
        } else if (type === "Hostalaría") {
            onSearch(sql.opinions.get.hostalaria.get, sql.opinions.get.hostalaria.count_valoracion, id, res);
        } else if (type === "Ocio") {
            onSearch(sql.opinions.get.ocio.get, sql.opinions.get.ocio.count_valoracion, id, res);
        } else if (type === "Outra") {
            onSearch(sql.opinions.get.outras.get, sql.opinions.get.outras.count_valoracion, id, res);
        } else {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

// postNew()
/**
 * Garda un novo comentario sobre un determinado elemento
 */
router.post('/new', verify.verifyToken, async (req, res) => {
    try {

        const userId = req.userId;

        var { valoracion, titulo, comentario, id_elemento, type } = req.body;

        if (valoracion == undefined || !titulo || !comentario || !id_elemento || !type || titulo.length > 50 
            || comentario.length > 250 || titulo == '' || comentario == '' 
            || valoracion < 0 || valoracion > 5) {
            helpers.onError(500, "Erro interno no servidor", undefined, res);
            return;
        }
        
        if(valoracion == null) {
            valoracion = 0;
        }

        const existLugares = sql.opinions.exists.lugares;
        const existMonumentos = sql.opinions.exists.monumentos;
        const existPlanificacions = sql.opinions.exists.planificacions;
        const existHospedaxes = sql.opinions.exists.hospedaxes;
        const existHostalaria = sql.opinions.exists.hostalaria;
        const existOcio = sql.opinions.exists.ocio;
        const existOutras = sql.opinions.exists.outras;

        const queryLugares = sql.opinions.new.lugares.insert;
        const mediaLugares = sql.opinions.new.lugares.media;
        const updateValoracionLugares = sql.opinions.new.lugares.updateVal;

        const queryMonumentos = sql.opinions.new.monumentos.insert;
        const mediaMonumentos = sql.opinions.new.monumentos.media;
        const updateValoracionMonumentos = sql.opinions.new.monumentos.updateVal;

        const queryPlanificacions = sql.opinions.new.planificacions.insert;
        const mediaPlanificacions = sql.opinions.new.planificacions.media;
        const updateValoracionPlanificacions = sql.opinions.new.planificacions.updateVal;

        const queryHospedaxes = sql.opinions.new.hospedaxe.insert;
        const mediaHospedaxes = sql.opinions.new.hospedaxe.media;
        const updateValoracionHospedaxes = sql.opinions.new.hospedaxe.updateVal;

        const queryHostalaria = sql.opinions.new.hostalaria.insert;
        const mediaHostalaria = sql.opinions.new.hostalaria.media;
        const updateValoracionHostalaria = sql.opinions.new.hostalaria.updateVal;

        const queryOcio = sql.opinions.new.ocio.insert;
        const mediaOcio = sql.opinions.new.ocio.media;
        const updateValoracionOcio = sql.opinions.new.ocio.updateVal;

        const queryOutras = sql.opinions.new.outras.insert;
        const mediaOutras = sql.opinions.new.outras.media;
        const updateValoracionOutras = sql.opinions.new.outras.updateVal;

        if (type == "Lugar turístico") {
            // Compróbase para cada tipo que o comentario non existe previamente realizado polo mesmo usuario sobre o mesmo elemento
            const exists = await onExists(existLugares, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryLugares, [userId, titulo, valoracion, comentario, id_elemento], mediaLugares, updateValoracionLugares, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Monumento") {
            const exists = await onExists(existMonumentos, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryMonumentos, [userId, titulo, valoracion, comentario, id_elemento], mediaMonumentos, updateValoracionMonumentos, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Planificación") {
            const exists = await onExists(existPlanificacions, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryPlanificacions, [userId, titulo, valoracion, comentario, id_elemento], mediaPlanificacions, updateValoracionPlanificacions, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Hospedaxe") {
            const exists = await onExists(existHospedaxes, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryHospedaxes, [userId, titulo, valoracion, comentario, id_elemento], mediaHospedaxes, updateValoracionHospedaxes, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Hostalaría") {
            const exists = await onExists(existHostalaria, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryHostalaria, [userId, titulo, valoracion, comentario, id_elemento], mediaHostalaria, updateValoracionHostalaria, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Ocio") {
            const exists = await onExists(existOcio, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryOcio, [userId, titulo, valoracion, comentario, id_elemento], mediaOcio, updateValoracionOcio, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else if (type == "Outra") {
            const exists = await onExists(existOutras, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryOutras, [userId, titulo, valoracion, comentario, id_elemento], mediaOutras, updateValoracionOutras, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        } else {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// delete()
/**
 * Borra un comentario almacenado na aplicación sobre un determinado elemento
 */
router.delete('/', verify.verifyToken, (req, res) => {

    try {

        const { id, id_elemento, type } = req.body;

        const lugar_turistico = sql.opinions.delete.lugares;
        const monumento = sql.opinions.delete.monumentos;
        const planificacion = sql.opinions.delete.planificacions;
        const hospedaxes = sql.opinions.delete.hospedaxes;
        const hostalaria = sql.opinions.delete.hostalaria;
        const ocio = sql.opinions.delete.ocio;
        const outras = sql.opinions.delete.outras;

        const mediaLugares = sql.opinions.new.lugares.media;
        const updateValoracionLugares = sql.opinions.new.lugares.updateVal;

        const mediaMonumentos = sql.opinions.new.monumentos.media;
        const updateValoracionMonumentos = sql.opinions.new.monumentos.updateVal;

        const mediaPlanificacions = sql.opinions.new.planificacions.media;
        const updateValoracionPlanificacions = sql.opinions.new.planificacions.updateVal;

        const mediaHospedaxes = sql.opinions.new.hospedaxe.media;
        const updateValoracionHospedaxes = sql.opinions.new.hospedaxe.updateVal;

        const mediaHostalaria = sql.opinions.new.hostalaria.media;
        const updateValoracionHostalaria = sql.opinions.new.hostalaria.updateVal;

        const mediaOcio = sql.opinions.new.ocio.media;
        const updateValoracionOcio = sql.opinions.new.ocio.updateVal;

        const mediaOutras = sql.opinions.new.outras.media;
        const updateValoracionOutras = sql.opinions.new.outras.updateVal;

        if (type === "Lugar turístico") {
            onTransactionUpdate(lugar_turistico, [id], mediaLugares, updateValoracionLugares, id_elemento, res);
        } else if (type === "Monumento") {
            onTransactionUpdate(monumento, [id], mediaMonumentos, updateValoracionMonumentos, id_elemento, res);
        } else if (type === "Planificación") {
            onTransactionUpdate(planificacion, [id], mediaPlanificacions, updateValoracionPlanificacions, id_elemento, res);
        } else if (type === "Hospedaxe") {
            onTransactionUpdate(hospedaxes, [id], mediaHospedaxes, updateValoracionHospedaxes, id_elemento, res);
        } else if (type === "Hostalaria") {
            onTransactionUpdate(hostalaria, [id], mediaHostalaria, updateValoracionHostalaria, id_elemento, res);
        } else if (type === "Ocio") {
            onTransactionUpdate(ocio, [id], mediaOcio, updateValoracionOcio, id_elemento, res);
        } else if (type === "Outra") {
            onTransactionUpdate(outras, [id], mediaOutras, updateValoracionOutras, id_elemento, res);
        } else {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// postEdit()
/**
 * Edita un comentario realizado por un usuario sobre un determinado elemento
 */
router.post('/edit', verify.verifyToken, (req, res) => {
    try {

        const { id, valoracion, titulo, comentario, id_elemento, type } = req.body;

        if (valoracion == undefined || !titulo || !comentario || id_elemento == undefined || !type || titulo.length > 50 
            || comentario.length > 250 || titulo == '' || comentario == '' 
            || valoracion < 0 || valoracion > 5 || id == undefined) {
            helpers.onError(500, "Erro interno no servidor", undefined, res);
            return;
        }

        const queryLugares = sql.opinions.edit.lugares;
        const mediaLugares = sql.opinions.new.lugares.media;
        const updateValoracionLugares = sql.opinions.new.lugares.updateVal;

        const queryMonumentos = sql.opinions.edit.monumentos;
        const mediaMonumentos = sql.opinions.new.monumentos.media;
        const updateValoracionMonumentos = sql.opinions.new.monumentos.updateVal;

        const queryPlanificacions = sql.opinions.edit.planificacions;
        const mediaPlanificacions = sql.opinions.new.planificacions.media;
        const updateValoracionPlanificacions = sql.opinions.new.planificacions.updateVal;

        const queryHospedaxes = sql.opinions.edit.hospedaxes;
        const mediaHospedaxes = sql.opinions.new.hospedaxe.media;
        const updateValoracionHospedaxes = sql.opinions.new.hospedaxe.updateVal;

        const queryHostalaria = sql.opinions.edit.hostalaria;
        const mediaHostalaria = sql.opinions.new.hostalaria.media;
        const updateValoracionHostalaria = sql.opinions.new.hostalaria.updateVal;

        const queryOcio = sql.opinions.edit.ocio;
        const mediaOcio = sql.opinions.new.ocio.media;
        const updateValoracionOcio = sql.opinions.new.ocio.updateVal;

        const queryOutras = sql.opinions.edit.outras;
        const mediaOutras = sql.opinions.new.outras.media;
        const updateValoracionOutras = sql.opinions.new.outras.updateVal;

        if (type === "Lugar turístico") {
            onTransactionUpdate(queryLugares, [valoracion, titulo, comentario, id], mediaLugares, updateValoracionLugares, id_elemento, res);
        } else if (type === "Monumento") {
            onTransactionUpdate(queryMonumentos, [valoracion, titulo, comentario, id], mediaMonumentos, updateValoracionMonumentos, id_elemento, res);
        } else if (type === "Planificación") {
            onTransactionUpdate(queryPlanificacions, [valoracion, titulo, comentario, id], mediaPlanificacions, updateValoracionPlanificacions, id_elemento, res);
        } else if (type === "Hospedaxe") {
            onTransactionUpdate(queryHospedaxes, [valoracion, titulo, comentario, id], mediaHospedaxes, updateValoracionHospedaxes, id_elemento, res);
        } else if (type === "Hostalaría") {
            onTransactionUpdate(queryHostalaria, [valoracion, titulo, comentario, id], mediaHostalaria, updateValoracionHostalaria, id_elemento, res);
        } else if (type === "Ocio") {
            onTransactionUpdate(queryOcio, [valoracion, titulo, comentario, id], mediaOcio, updateValoracionOcio, id_elemento, res);
        } else if (type === "Outra") {
            onTransactionUpdate(queryOutras, [valoracion, titulo, comentario, id], mediaOutras, updateValoracionOutras, id_elemento, res);
        } else {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
})

/**
 * Executa unha determinada transacción, empregando ata tres queries distintas
 * @param {String} first 
 * @param {Array} firstValues 
 * @param {String} second 
 * @param {String} third 
 * @param {String} type 
 * @param {Object} res 
 * @param {Number} idUsuario 
 */
const onTransaction = (first, firstValues, second, third, type, res, idUsuario) => {

    // Conexión ca BBDD
    pool.connect((err, client, done) => {
        /**
         * Comproba se é necesario parar a transacción por algún erro
         * @param {Object} err 
         * @returns
         */
        const shouldAbort = err => {
            if (err) {
                // En caso de erro, faise un ROLLBACK
                client.query('ROLLBACK', error => {
                    if (error) {
                        helpers.onError(500, "Erro interno no servidor", error, res);
                        return;
                    }

                    done()
                    helpers.onError(500, "Erro interno no servidor", err, res);
                    return;
                })
            }
            return !!err
        }

        // Inicio da transacción
        client.query('BEGIN', err => {
            if (shouldAbort(err)) return;
            client.query(first, firstValues, (err, results) => {
                if (shouldAbort(err)) return;

                var id_elemento;
                const comment = results.rows[0];
                // Obtención do id do elemento en función do seu tipo
                if (type == "Lugar turístico") {
                    id_elemento = comment.id_lugar_turistico;
                } else if (type == "Monumento") {
                    id_elemento = comment.id_monumento;
                } else if (type == "Planificación") {
                    id_elemento = comment.id_planificacion;
                } else if (type == "Hospedaxe") {
                    id_elemento = comment.id_lugar_hospedaxe;
                } else if (type == "Hostalaría") {
                    id_elemento = comment.id_lugar_hostalaria;
                } else if (type == "Ocio") {
                    id_elemento = comment.id_actividade_ocio;
                } else if (type == "Outra") {
                    id_elemento = comment.id_outra_actividade;
                } else {
                    id_elemento = null;
                }
                client.query(second, [id_elemento], (err, results) => {
                    if (shouldAbort(err)) return;

                    // Obtense a valoración media do elemento concreto, co obxectivo de actualizala no elemento
                    const media = results.rows[0].valoracion;
                    client.query(third, [media, id_elemento], (err, results) => {
                        if (shouldAbort(err)) return;

                        const { valoracion } = results.rows[0];

                        // Selección do usuario, para devolvelo na resposta
                        client.query("SELECT usuario FROM fresh_tour.usuarios WHERE id = $1", [idUsuario], (err, results) => {

                            if (shouldAbort(err)) return;
                            const { usuario } = results.rows[0];

                            // Commit da transacción
                            client.query('COMMIT', error => {
                                if (error) {
                                    helpers.onError(500, "Erro interno no servidor", error, res);
                                    return;
                                }
                                try {
                                    done();
                                    comment["usuario"] = usuario;
                                    // Resposta
                                    return res.status(200).send({
                                        comment: comment,
                                        valoracion: valoracion,
                                        status: 200
                                    });

                                } catch (err) {
                                    helpers.onError(500, "Erro interno no servidor", err, res);
                                    return;
                                }
                            })
                        })

                    })
                });
            });
        })
    });
}

/**
 * Executa unha transacción que implica operacións de actualización, distintas á anterior
 * @param {String} first 
 * @param {Array} firstValues 
 * @param {String} second 
 * @param {String} third 
 * @param {Number} id_elemento 
 * @param {Object} res 
 */
const onTransactionUpdate = (first, firstValues, second, third, id_elemento, res) => {

    // Conexión ca base de datos
    pool.connect((err, client, done) => {
        /**
         * Comproba se é necesario parar a transacción por algún erro
         * @param {Object} err 
         * @returns 
         */
        const shouldAbort = err => {
            if (err) {
                // En caso de erro, realízase un ROLLBACK
                client.query('ROLLBACK', error => {
                    if (error) {
                        helpers.onError(500, "Erro interno no servidor", error, res);
                        return;
                    }

                    done()
                    helpers.onError(500, "Erro interno no servidor", err, res);
                    return;
                })
            }
            return !!err
        }

        // Comezo da transacción
        client.query('BEGIN', err => {
            if (shouldAbort(err)) return;

            client.query(first, firstValues, (err, results) => {
                if (shouldAbort(err)) return;

                client.query(second, [id_elemento], (err, results) => {
                    if (shouldAbort(err)) return;

                    // Obtención da valoración media
                    var media = results.rows[0].valoracion;
                    if(media == null) {
                        media = 0;
                    }
                    client.query(third, [media, id_elemento], (err, results) => {
                        if (shouldAbort(err)) return;

                        // Commit para confirmar os cambios
                        client.query('COMMIT', error => {
                            if (error) {
                                helpers.onError(500, "Erro interno no servidor", error, res);
                                return;
                            }
                            try {
                                done();
                                // Resposta
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
            });
        })
    });
}

/**
 * Comproba se unha opinión existe na base de datos realizada sobre un elemento por un usuario concreto
 * @param {String} query 
 * @param {Number} id 
 * @param {Number} userId 
 * @param {Object} res 
 * @returns {Boolean}
 */
const onExists = async (query, id, userId, res) => {
    try {
        const { rowCount } = await pool.query(query, [userId, id]);
        if (rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        throw new Error(err);
    }

}

/**
 * Realiza a busca de comentarios na base de datos
 * @param {String} query 
 * @param {String} secondQuery 
 * @param {Number} id 
 * @param {Object} res 
 */
const onSearch = (query, secondQuery, id, res) => {

    pool.query(query, [id], (err, results) => {
        if (err) {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }
        pool.query(secondQuery, [id], (err, resultsSecond) => {
            if (err) {
                helpers.onError(500, "Erro interno do servidor", err, res);
                return;
            }
            // Resposta
            res.json({
                opinions: results.rows,
                valoracion: resultsSecond.rows[0].valoracion,
                count: resultsSecond.rows[0].count,
                status: 200
            });
        })

    });
}

module.exports = router;