/**
 * @fileoverview Operacións relacionadas coas planificacións
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');                 // Instancia de express
const router = express.Router();                    // Instancia de router, para crear rutas

const pool = require('../../database/database');    // Instancia para executar queries sobre a BBDD
const sql = require('../lib/sql');                  // Obxecto que reúne todas as consultas a realizar
const helpers = require('../lib/helpers');          // Funcións comúns
const verify = require('../lib/VerifyToken');       // Verifica o token de usuario, empregado como middleware

// get()
/**
 * Obtén todos os elementos turísticos, indicando os favoritos
 */
router.get('/', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        const query = sql.elementos.sortBy.valoracion;
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

// getLugar()
/**
 * Obtén un lugar turístico concreto, indicando se é favorito
 */
router.get('/lugar/:id', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        const query = sql.elementos.lugar;
        const { id } = req.params;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
                return;
            }
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
    }
});

// getMonumento()
/**
 * Obtén un monumento concreto, indicando se é favorito
 */
router.get('/monumento/:id', verify.verifyTokenWithoutReturn, function (req, res) {

    try {

        const userId = req.userId;
        const query = sql.elementos.monumento;
        const { id } = req.params;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(query, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
                return;
            }
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os puntos de interese", err, res);
    }
});

// getSortBy()
/**
 * Ordena os elementos turísticos dun determinado modo, indicando os favoritos
 */
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

// getFavSortBy()
/**
 * Ordena os elementos turísticos favoritos dun determinado modo
 */
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

// postFav()
/**
 * Engade un elemento turístico como favorito
 */
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

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        }  else {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

// deleteFav()
/**
 * Quita un elemento turístico como favorito
 */
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

        if (type === "Lugar turístico") {
            helpers.onExecuteQuery(lugar_turistico, userId, id_elemento, res, pool);
        } else if (type === "Monumento") {
            helpers.onExecuteQuery(monumento, userId, id_elemento, res, pool);
        } else {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }

});

// getFav()
/**
 * Obtén os elementos turísticos favoritos
 */
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

// getFavByName()
/**
 * Obtén elementos turísticos favoritos por nome
 */
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

// getByName()
/**
 * Obtén elementos turísticos por nome, indicando os favoritos
 */
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
        const namePerc = '%' + name + '%';
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

module.exports = router;