const express = require('express');
const router = express.Router();

const pool = require('../../database/database');

const helpers = require('../lib/helpers');
const verify = require('../lib/VerifyToken');

router.get('/', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        const query = "SELECT *, 'Lugar turístico' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE ltf.id_lugar_turistico = lt.id AND ltf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.lugares_turisticos lt  WHERE prezo is not NULL ORDER BY titulo asc"
        var values = [];
        if(userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
                return;
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

router.get('/:name',verify.verifyTokenWithoutReturn, function (req, res) {
    try {
        const userId = req.userId;
        var values = [];
        if(userId) {
            values.push(userId);
        } else {
            values.push(-1);
        }

        const { name } = req.params;
        const namePerc = '%' + name + '%'
        values.push(namePerc);
        pool.query("SELECT *, 'Lugar turístico' as tipo, CASE WHEN EXISTS (SELECT 1 FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE ltf.id_lugar_turistico = lt.id AND ltf.id_usuario = $1) THEN CAST(1 AS BOOL) ELSE CAST(0 AS BOOL) END AS favorito FROM fresh_tour.lugares_turisticos lt WHERE prezo is not NULL and titulo like $2 ORDER BY titulo ASC", values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            return res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro na busca", err, res);
    }
});

module.exports = router;