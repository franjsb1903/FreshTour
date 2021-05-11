const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const tag_traductor = require('../lib/tag_traductor');

router.get('/hostalaria', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(sql.lecer.hostalaria.valoracion, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
            });
            res.status(200).json({
                hostalaria: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

router.get('/hostalaria/:name', verify.verifyTokenWithoutReturn, (req, res) => {

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

        pool.query(sql.lecer.hostalaria.byName, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
            });
            res.status(200).json({
                hostalaria: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

router.post('/hostalaria/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_lugar_hostalaria } = req.body;

        pool.query(sql.lecer.hostalaria.fav.add, [id_lugar_hostalaria, userId], (err, results) => {
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

router.delete('/hostalaria/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_lugar_hostalaria } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_lugar_hostalaria == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        pool.query(sql.lecer.hostalaria.fav.delete, [id_lugar_hostalaria, userId], (err, results) => {
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

router.get('/hostalaria/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getQueryHospedaxe(type);

        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
            });
            res.status(200).json({
                hostalaria: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }

});

router.get('/hostalaria/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        pool.query(sql.lecer.hostalaria.fav.byName, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                hostalaria: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/hostalaria/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getFavQueryHospedaxe(type);

        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaria", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
            });
            res.status(200).json({
                hostalaria: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaria", err, res);
    }

});

const getFavQueryHospedaxe = (type) => {
    switch (type) {
        case "bares_titulo":
            return sql.lecer.hostalaria.fav.bares.titulo;
        case "bares_valoracion":
            return sql.lecer.hostalaria.fav.bares.valoracion;
        case "restaurantes_titulo":
            return sql.lecer.hostalaria.fav.restaurantes.titulo;
        case "restaurantes_valoracion":
            return sql.lecer.hostalaria.fav.restaurantes.valoracion;
        case "cafes_titulo":
            return sql.lecer.hostalaria.fav.cafes.titulo;
        case "cafes_valoracion":
            return sql.lecer.hostalaria.fav.cafes.valoracion;
        case "pubs_titulo":
            return sql.lecer.hostalaria.fav.pubs.titulo;
        case "pubs_valoracion":
            return sql.lecer.hostalaria.fav.pubs.valoracion;
        case "zonas_comida_titulo":
            return sql.lecer.hostalaria.fav.zonas_comida.titulo;
        case "zonas_comida_valoracion":
            return sql.lecer.hostalaria.fav.zonas_comida.valoracion;
        case "comida_rapida_titulo":
            return sql.lecer.hostalaria.fav.comida_rapida.titulo;
        case "comida_rapida_valoracion":
            return sql.lecer.hostalaria.fav.comida_rapida.valoracion;
        case "xeaderias_titulo":
            return sql.lecer.hostalaria.fav.xeaderias.titulo;
        case "xeaderias_valoracion":
            return sql.lecer.hostalaria.fav.xeaderias.valoracion;
        case "pastelerias_titulo":
            return sql.lecer.hostalaria.fav.pastelerias.titulo;
        case "pastelerias_valoracion":
            return sql.lecer.hostalaria.fav.pastelerias.valoracion;
        case "panaderias_titulo":
            return sql.lecer.hostalaria.fav.panaderias.titulo;
        case "panaderias_valoracion":
            return sql.lecer.hostalaria.fav.panaderias.valoracion;
        case "chocolaterias_titulo":
            return sql.lecer.hostalaria.fav.chocolaterias.titulo;
        case "chocolaterias_valoracion":
            return sql.lecer.hostalaria.fav.chocolaterias.valoracion;
        case "all_titulo":
            return sql.lecer.hostalaria.fav.titulo;
        case "all_valoracion":
            return sql.lecer.hostalaria.fav.valoracion;
        default:
            return undefined;
    }
}

const getQueryHospedaxe = (type) => {
    switch (type) {
        case "bares_titulo":
            return sql.lecer.hostalaria.bares.titulo;
        case "bares_valoracion":
            return sql.lecer.hostalaria.bares.valoracion;
        case "restaurantes_titulo":
            return sql.lecer.hostalaria.restaurantes.titulo;
        case "restaurantes_valoracion":
            return sql.lecer.hostalaria.restaurantes.valoracion;
        case "cafes_titulo":
            return sql.lecer.hostalaria.cafes.titulo;
        case "cafes_valoracion":
            return sql.lecer.hostalaria.cafes.valoracion;
        case "pubs_titulo":
            return sql.lecer.hostalaria.pubs.titulo;
        case "pubs_valoracion":
            return sql.lecer.hostalaria.pubs.valoracion;
        case "zonas_comida_titulo":
            return sql.lecer.hostalaria.zonas_comida.titulo;
        case "zonas_comida_valoracion":
            return sql.lecer.hostalaria.zonas_comida.valoracion;
        case "comida_rapida_titulo":
            return sql.lecer.hostalaria.comida_rapida.titulo;
        case "comida_rapida_valoracion":
            return sql.lecer.hostalaria.comida_rapida.valoracion;
        case "xeaderias_titulo":
            return sql.lecer.hostalaria.xeaderias.titulo;
        case "xeaderias_valoracion":
            return sql.lecer.hostalaria.xeaderias.valoracion;
        case "pastelerias_titulo":
            return sql.lecer.hostalaria.pastelerias.titulo;
        case "pastelerias_valoracion":
            return sql.lecer.hostalaria.pastelerias.valoracion;
        case "panaderias_titulo":
            return sql.lecer.hostalaria.panaderias.titulo;
        case "panaderias_valoracion":
            return sql.lecer.hostalaria.panaderias.valoracion;
        case "chocolaterias_titulo":
            return sql.lecer.hostalaria.chocolaterias.titulo;
        case "chocolaterias_valoracion":
            return sql.lecer.hostalaria.chocolaterias.valoracion;
        case "all_titulo":
            return sql.lecer.hostalaria.titulo;
        case "all_valoracion":
            return sql.lecer.hostalaria.valoracion;
        default:
            return undefined;
    }
}

module.exports = router;