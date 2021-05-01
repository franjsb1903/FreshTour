const express = require('express');
const router = express.Router();

const pool = require('../../database/database');
const sql = require('../lib/sql');
const helpers = require('../lib/helpers');
const verify = require('../lib/VerifyToken');

router.get('/', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        const query = sql.elementos.sortBy.titulo;
        var values = [];
        if (userId === undefined) {
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

router.get('/:name', verify.verifyTokenWithoutReturn, function (req, res) {
    try {
        const userId = req.userId;
        var values = [];
        if (userId) {
            values.push(userId);
        } else {
            values.push(-1);
        }

        const { name } = req.params;
        const namePerc = '%' + name + '%'
        values.push(namePerc);
        pool.query(sql.elementos.byName, values, (err, results) => {
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

router.get('/sortBy/:type', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        var query = undefined;

        const { type } = req.params;

        if (type === "titulo") {
            query = sql.elementos.sortBy.titulo;
        } else {
            query = sql.elementos.sortBy.valoracion;
        }

        var values = [];
        if (userId === undefined) {
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

router.get('/fav/sortBy/:type', verify.verifyToken, function (req, res) {

    try {

        const userId = req.userId;
        var query = undefined;

        const { type } = req.params;

        if (type === "titulo") {
            query = sql.elementos.favs.sortBy.titulo;
        } else {
            query = sql.elementos.favs.sortBy.valoracion;
        }

        var values = [];
        if (userId === undefined) {
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

module.exports = router;