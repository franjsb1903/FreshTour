const express = require('express');
const router = express.Router();

const pool = require('../../database/database');

const helpers = require('../lib/helpers');

router.get('/turismo', function (req, res) {

    try {

        pool.query("SELECT *, 'Lugar turistico' as tipo FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL ORDER BY titulo ASC", (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
    }
});

router.get('/turismo/:name', function (req, res) {
    try {
        const { name } = req.params;
        const namePerc = '%' + name + '%'
        pool.query("SELECT *, 'Lugar turistico' as tipo FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL and titulo like $1 ORDER BY titulo ASC", [namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro na busca", err, res);
    }
});

module.exports = router;