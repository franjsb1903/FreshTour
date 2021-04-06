const express = require('express');
const router = express.Router();

const pool = require('../../database/database');

router.get('/turism', async function (req, res) {
    try {
        const turism = await pool.query("SELECT * FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL");
        res.json(turism.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;