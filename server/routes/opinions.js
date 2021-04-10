const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

router.get('/opinions/count/:type/:id', async function (req, res) {
    try {
        const { type, id } = req.params;

        let count;

        if(type === "Lugar turistico") {
            count = await pool.query("select count(id) from fresh_tour.comentarios_valoracions_lugares_turisticos where id = $1", [id]);
        } else if(type === "Monumento") {
            count = count = await pool.query("select count(id) from fresh_tour.comentarios_valoracions_monumentos where id = $1", [id]);
        } else {
            count = await pool.query("select count(id) from fresh_tour.comentarios_valoracions_planificacions where id = $1", [id]);
        }

        res.json(count.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;