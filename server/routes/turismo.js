const express = require('express');
const router = express.Router();

const pool = require('../../database/database');

router.get('/turismo', async function (req, res) {
    try {
        const turism = await pool.query("SELECT *, 'Lugar turistico' as tipo FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL ORDER BY titulo ASC");
        res.json(turism.rows);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/turismo/:name', async function (req, res) {
    try {
        const { name } = req.params;
        const namePerc = '%' + name + '%'
        const turism = await pool.query("SELECT *, 'Lugar turistico' as tipo FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL and titulo like $1 ORDER BY titulo ASC", [namePerc]);
        res.json(turism.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;