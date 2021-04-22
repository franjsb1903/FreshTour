const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

const helpers = require('../lib/helpers');

const onSearch = (query, id, res) => {
    pool.query(query, [id], (err, results) => {
        if (err) {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }
        res.json({
            count: results.rows,
            status: 200
        });
    });
}

router.get('/opinions/count/:type/:id', async function (req, res) {
    try {
        const { type, id } = req.params;

        if (type === "Lugar turistico") {
            onSearch("select count(id) from fresh_tour.comentarios_valoracions_lugares_turisticos where id = $1", id, res);
        } else if (type === "Monumento") {
            onSearch("select count(id) from fresh_tour.comentarios_valoracions_monumentos where id = $1", id, res);
        } else {
            onSearch("select count(id) from fresh_tour.comentarios_valoracions_planificacions where id = $1", id, res);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

module.exports = router;