const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');

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

router.get('/:type/:id', async (req, res) => {

    try {
        const { type, id } = req.params;

        if (type === "Lugar turistico") {
            onSearch("select id, titulo, valoracion, comentario, id_lugar_turistico, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_lugares_turisticos cvlt inner join (select id, usuarios from fresh_tour.usuarios) as usuarios on cvlt.id_usuario = usuarios.id where cvlt.id_lugar_turistico = $1", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_lugares_turisticos where id = $1", id, res);
        } else if (type === "Monumento") {
            onSearch("select id, titulo, valoracion, comentario, id_monumento, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_monumentos cvm inner join (select id, usuarios from fresh_tour.usuarios) as usuarios on cvm.id_usuario = usuarios.id where cvm.id_monumento = $1", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_lugares_turisticos where id = $1", id, res);
        } else {
            onSearch("select id, titulo, valoracion, comentario, id_planificacion, to_char(data, 'DD-MM-YY') as data from fresh_tour.comentarios_valoracions_planificacions cvp inner join (select id, usuarios from fresh_tour.usuarios) as usuarios on cvp.id_usuario = usuarios.id where cvp.id_planificacion = $1", "select count(id) as count, avg(valoracion) as valoracion from fresh_tour.comentarios_valoracions_lugares_turisticos where id = $1", id, res);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.post('/new', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;
        const { valoracion, titulo, comentario, id_elemento, type } = req.body;

        const queryLugares = "INSERT INTO fresh_tour.comentarios_valoraciones_lugares_turisticos(id_usuario, titulo, data, valoracion, comentario, id_lugar_turistico) values ($1, $2, CURRENT_TIMESTAMP, $3, $4, $5)";

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
})

module.exports = router;