const express = require('express');
const router = express.Router();
const pool = require('../../database/database');

router.get('/users', async function (req, res) {
    try {
        const users = await pool.query("SELECT * FROM fresh_tour.usuarios");
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;