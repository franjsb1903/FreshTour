const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const tag_traductor = require('../lib/tag_traductor');

router.get('/', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(sql.hospedaxe.all, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

router.get('/:name', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        const { name } = req.params;
        const namePerc = '%' + name + '%'
        values.push(namePerc);

        pool.query(sql.hospedaxe.byName, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

router.get('/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        pool.query(sql.hospedaxe.fav.byName, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getQuery(type);

        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }

});

router.get('/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getFavQuery(type);

        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }

});

router.post('/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_lugar_hospedaxe } = req.body;

        pool.query(sql.hospedaxe.fav.add, [id_lugar_hospedaxe, userId], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro interno do servidor", err, res);
                return;
            }
            res.json({
                status: 200
            });
        });

    } catch (err) {
        helpers.onError(500, "Erro engadindo o elemento como favorito", err, res);
    }

});

router.delete('/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_lugar_hospedaxe } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_lugar_hospedaxe == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        pool.query(sql.hospedaxe.fav.delete, [id_lugar_hospedaxe, userId], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro interno do servidor", err, res);
                return;
            }
            res.json({
                status: 200
            });
        })

    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

const getFavQuery = (type) => {
    switch (type) {
        case "hoteis_titulo":
            return sql.hospedaxe.fav.hoteis.titulo;
        case "hoteis_valoracion":
            return sql.hospedaxe.fav.hoteis.valoracon;
        case "hostais_titulo":
            return sql.hospedaxe.fav.hostais.titulo;
        case "hostais_valoracion":
            return sql.hospedaxe.fav.hostais.valoracon;
        case "aloxamento_titulo":
            return sql.hospedaxe.fav.aloxamento.titulo;
        case "aloxamento_valoracion":
            return sql.hospedaxe.fav.aloxamento.valoracon;
        case "caravanas_titulo":
            return sql.hospedaxe.fav.caravanas.titulo;
        case "caravanas_valoracion":
            return sql.hospedaxe.fav.caravanas.valoracon;
        case "vivendas_titulo":
            return sql.hospedaxe.fav.vivendas.titulo;
        case "vivendas_valoracion":
            return sql.hospedaxe.fav.vivendas.valoracon;
        case "camping_titulo":
            return sql.hospedaxe.fav.camping.titulo;
        case "camping_valoracion":
            return sql.hospedaxe.fav.camping.valoracon;
        case "moteis_titulo":
            return sql.hospedaxe.fav.moteis.titulo;
        case "moteis_valoracion":
            return sql.hospedaxe.fav.moteis.valoracon;
        case "all_titulo":
            return sql.hospedaxe.fav.titulo;
        case "all_valoracion":
            return sql.hospedaxe.fav.valoracion;
        default:
            return undefined;
    }
}

const getQuery = (type) => {
    switch (type) {
        case "hoteis_titulo":
            return sql.hospedaxe.hoteis.titulo;
        case "hoteis_valoracion":
            return sql.hospedaxe.hoteis.valoracon;
        case "hostais_titulo":
            return sql.hospedaxe.hostais.titulo;
        case "hostais_valoracion":
            return sql.hospedaxe.hostais.valoracon;
        case "aloxamento_titulo":
            return sql.hospedaxe.aloxamento.titulo;
        case "aloxamento_valoracion":
            return sql.hospedaxe.aloxamento.valoracon;
        case "caravanas_titulo":
            return sql.hospedaxe.caravanas.titulo;
        case "caravanas_valoracion":
            return sql.hospedaxe.caravanas.valoracon;
        case "vivendas_titulo":
            return sql.hospedaxe.vivendas.titulo;
        case "vivendas_valoracion":
            return sql.hospedaxe.vivendas.valoracon;
        case "camping_titulo":
            return sql.hospedaxe.camping.titulo;
        case "camping_valoracion":
            return sql.hospedaxe.camping.valoracon;
        case "moteis_titulo":
            return sql.hospedaxe.moteis.titulo;
        case "moteis_valoracion":
            return sql.hospedaxe.moteis.valoracon;
        case "all_titulo":
            return sql.hospedaxe.titulo;
        case "all_valoracion":
            return sql.hospedaxe.valoracion;
        default:
            return undefined;
    }
}

module.exports = router;