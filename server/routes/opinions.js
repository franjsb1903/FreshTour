const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

router.get('/:type/:id', async (req, res) => {

    try {
        const { type, id } = req.params;

        if (type === "Lugar turístico") {
            onSearch("select cvlt.id, id_usuario, usuario, titulo, valoracion, comentario, id_lugar_turistico as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_lugares_turisticos cvlt inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvlt.id_usuario = usuarios.id where cvlt.id_lugar_turistico = $1 order by data asc", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_lugares_turisticos where id_lugar_turistico = $1", id, res);
        } else if (type === "Monumento") {
            onSearch("select cvm.id, id_usuario, usuario, titulo, valoracion, comentario, id_monumento as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_monumentos cvm inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvm.id_usuario = usuarios.id where cvm.id_monumento = $1 order by data asc", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_monumentos where id_monumento = $1", id, res);
        } else {
            onSearch("select cvp.id, id_usuario, usuario, titulo, valoracion, comentario, id_planificacion as id_elemento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_planificacions cvp inner join (select id, usuario from fresh_tour.usuarios) as usuarios on cvp.id_usuario = usuarios.id where cvp.id_planificacion = $1 order by data asc", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_planificacions where id_planificacion = $1", id, res);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.post('/new', verify.verifyToken, async (req, res) => {
    try {

        const userId = req.userId;

        const { valoracion, titulo, comentario, id_elemento, type } = req.body;

        const existLugares = "SELECT * FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_usuario = $1 AND id_lugar_turistico = $2";
        const existMonumentos = "SELECT * FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_usuario = $1 AND id_monumento = $2";
        const existPlanificacions = "SELECT * FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_usuario = $1 AND id_planificacion = $2";

        const queryLugares = "INSERT INTO fresh_tour.comentarios_valoracions_lugares_turisticos(id_usuario, titulo, data, valoracion, comentario, id_lugar_turistico) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_lugar_turistico";
        const mediaLugares = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_lugar_turistico = $1"
        const updateValoracionLugares = "UPDATE fresh_tour.lugares_turisticos SET valoracion = $1 WHERE id = $2 RETURNING valoracion"

        const queryMonumentos = "INSERT INTO fresh_tour.comentarios_valoracions_monumentos(id_usuario, titulo, data, valoracion, comentario, id_monumento) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_monumento";
        const mediaMonumentos = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_monumento = $1"
        const updateValoracionMonumentos = "UPDATE fresh_tour.monumentos SET valoracion = $1 WHERE id = $2 RETURNING valoracion"

        const queryPlanificacions = "INSERT INTO fresh_tour.comentarios_valoracions_planificacions(id_usuario, titulo, data, valoracion, comentario, id_planificacion) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5) RETURNING id, id_usuario, titulo, to_char(data, 'DD-MM-YY') as data, valoracion, comentario, id_planificacion";
        const mediaPlanificacions = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1"
        const updateValoracionPlanificacions = "UPDATE fresh_tour.planificacions SET valoracion = $1 WHERE id = $2 RETURNING valoracion"


        if (type == "Lugar turístico") {
            const exists = await onExists(existLugares, id_elemento, userId, res);
            console.log(exists);
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
        } else {
            const exists = await onExists(existPlanificacions, id_elemento, userId, res);
            if (!exists) {
                onTransaction(queryPlanificacions, [userId, titulo, valoracion, comentario, id_elemento], mediaPlanificacions, updateValoracionPlanificacions, type, res, userId);
            } else {
                helpers.onError(401, "Xa realizou un comentario sobre este elemento", undefined, res);
                return;
            }
        }

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.delete('/', verify.verifyToken, (req, res) => {

    try {

        const { id, id_elemento, type } = req.body;

        const lugar_turistico = "DELETE FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id = $1";
        const monumento = "DELETE FROM fresh_tour.comentarios_valoracions_monumentos WHERE id = $1";
        const planificacion = "DELETE FROM fresh_tour.comentarios_valoracions_planificacions WHERE id = $1";

        const mediaLugares = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_lugar_turistico = $1"
        const updateValoracionLugares = "UPDATE fresh_tour.lugares_turisticos SET valoracion = $1 WHERE id = $2"

        const mediaMonumentos = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_monumento = $1"
        const updateValoracionMonumentos = "UPDATE fresh_tour.monumentos SET valoracion = $1 WHERE id = $2"

        const mediaPlanificacions = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1"
        const updateValoracionPlanificacions = "UPDATE fresh_tour.planificacions SET valoracion = $1 WHERE id = $2"

        console.log(id, id_elemento, type);

        if (type === "Lugar turístico") {
            onTransactionUpdate(lugar_turistico, [id], mediaLugares, updateValoracionLugares, id_elemento, res);
        } else if (type === "Monumento") {
            onTransactionUpdate(monumento, [id], mediaMonumentos, updateValoracionMonumentos, id_elemento, res);
        } else {
            onTransactionUpdate(planificacion, [id], mediaPlanificacions, updateValoracionPlanificacions, id_elemento, res);
        }

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.post('/edit', verify.verifyToken, (req, res) => {
    try {

        const { id, valoracion, titulo, comentario, id_elemento, type } = req.body;

        const queryLugares = "UPDATE fresh_tour.comentarios_valoracions_lugares_turisticos SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";
        const mediaLugares = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_lugares_turisticos WHERE id_lugar_turistico = $1"
        const updateValoracionLugares = "UPDATE fresh_tour.lugares_turisticos SET valoracion = $1 WHERE id = $2"

        const queryMonumentos = "UPDATE fresh_tour.comentarios_valoracions_monumentos SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";
        const mediaMonumentos = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_monumentos WHERE id_monumento = $1"
        const updateValoracionMonumentos = "UPDATE fresh_tour.monumentos SET valoracion = $1 WHERE id = $2"

        const queryPlanificacions = "UPDATE fresh_tour.comentarios_valoracions_planificacions SET valoracion = $1, titulo = $2, comentario = $3 WHERE id = $4";
        const mediaPlanificacions = "SELECT avg(valoracion) as media FROM fresh_tour.comentarios_valoracions_planificacions WHERE id_planificacion = $1"
        const updateValoracionPlanificacions = "UPDATE fresh_tour.planificacions SET valoracion = $1 WHERE id = $2"

        if (type === "Lugar turístico") {
            onTransactionUpdate(queryLugares, [valoracion, titulo, comentario, id], mediaLugares, updateValoracionLugares, id_elemento, res);
        } else if (type === "Monumento") {
            onTransactionUpdate(queryMonumentos, [valoracion, titulo, comentario, id], mediaMonumentos, updateValoracionMonumentos, id_elemento, res);
        } else {
            onTransactionUpdate(queryPlanificacions, [valoracion, titulo, comentario, id], mediaPlanificacions, updateValoracionPlanificacions, id_elemento, res);
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
                } else {
                    id_elemento = comment.id_planificacion;
                }
                client.query(second, [id_elemento], (err, results) => {
                    if (shouldAbort(err)) return;

                    const media = results.rows[0].media;
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

                    const media = results.rows[0].media;
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