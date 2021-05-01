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

router.post('/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const lugar_turistico = sql.elementos.favs.new.lugares;
        const monumento = sql.elementos.favs.new.monumentos;
        const planificacion = sql.elementos.favs.new.planificacions;

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        } else {
            helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.delete('/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        const lugar_turistico = sql.elementos.favs.delete.lugares;
        const monumento = sql.elementos.favs.delete.monumentos;
        const planificacion = sql.elementos.favs.delete.planificacions;

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        } else {
            helpers.onExecuteQuery(planificacion, userId, id_elemento, res, pool);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

router.get('/fav/', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;

        const elementos_favoritos = sql.elementos.favs.all;
        pool.query(elementos_favoritos, [userId], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        const elementos_favoritos = sql.elementos.favs.byName;
        pool.query(elementos_favoritos, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                turismo: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

module.exports = router;