const express = require('express');
const app = express();

const cors = require('cors');
const db = require('../database/database');
const pool = require('../database/database');

app.use(cors());
app.use(express.json());

app.get('/users', async function (req, res) {
    try {
        const users = await pool.query("SELECT * FROM fresh_tour.usuarios");
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.listen(3000, () => {
    console.log('Server on port 3000');
});