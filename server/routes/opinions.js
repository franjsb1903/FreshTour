const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');

// get()
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
router.post('/new', verify.verifyToken, async (req, res) => {
    try {

        const userId = req.userId;

        const { valoracion, titulo, comentario, id_elemento, type } = req.body;

        console.log(valoracion, titulo, comentario, id_elemento, type);

        if (valoracion == undefined || !titulo || !comentario || !id_elemento || !type || titulo.length > 50 
            || comentario.length > 250 || titulo == '' || comentario == '' 
            || valoracion < 0 || valoracion > 5) {
            helpers.onError(500, "Erro interno no servidor", undefined, res);
            return;
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

        console.log(type);
        if (type === "Lugar turístico") {
            onTransactionUpdate(lugar_turistico, [id], mediaLugares, updateValoracionLugares, id_elemento, res);
        } else if (type === "Monumento") {
            onTransactionUpdate(monumento, [id], mediaMonumentos, updateValoracionMonumentos, id_elemento, res);
        } else if (type === "Planificación") {
            onTransactionUpdate(planificacion, [id], mediaPlanificacions, updateValoracionPlanificacions, id_elemento, res);
        } else if (type === "Hospedaxe") {
            onTransactionUpdate(hospedaxes, [id], mediaHospedaxes, updateValoracionHospedaxes, id_elemento, res);
        } else if (type === "Hostalaría") {
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

const onTransaction = (first, firstValues, second, third, type, res, idUsuario) => {

    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
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

        client.query('BEGIN', err => {
            if (shouldAbort(err)) return;
            client.query(first, firstValues, (err, results) => {
                if (shouldAbort(err)) return;

                var id_elemento;
                const comment = results.rows[0];
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

                    const media = results.rows[0].valoracion;
                    client.query(third, [media, id_elemento], (err, results) => {
                        if (shouldAbort(err)) return;

                        const { valoracion } = results.rows[0];

                        client.query("SELECT usuario FROM fresh_tour.usuarios WHERE id = $1", [idUsuario], (err, results) => {

                            if (shouldAbort(err)) return;
                            const { usuario } = results.rows[0];

                            client.query('COMMIT', error => {
                                if (error) {
                                    helpers.onError(500, "Erro interno no servidor", error, res);
                                    return;
                                }
                                try {
                                    done();
                                    comment["usuario"] = usuario;
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

const onTransactionUpdate = (first, firstValues, second, third, id_elemento, res) => {

    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
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


        client.query('BEGIN', err => {
            if (shouldAbort(err)) return;

            client.query(first, firstValues, (err, results) => {
                if (shouldAbort(err)) return;

                client.query(second, [id_elemento], (err, results) => {
                    if (shouldAbort(err)) return;

                    const media = results.rows[0].valoracion;
                    client.query(third, [media, id_elemento], (err, results) => {
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
            });
        })
    });
}

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