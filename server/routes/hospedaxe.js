const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const tag_traductor = require('../lib/tag_traductor');

router.get('/', (req, res) => {

    try {

        pool.query(sql.hospedaxe.all, (err, results) => {
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

router.get('/filter/:type', (req, res) => {

    try {

        const { type } = req.params;

        const query = getQuery(type);

        pool.query(query, (err, results) => {
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