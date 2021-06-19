/**
 * @fileoverview Operacións relacionadas cos elementos de hospedaxe
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');                             // Instancia de express
const router = express.Router();                                // Instancia de router para a creación de rutas
const pool = require('../../database/database');                // Instancia para realizar consultas sobre a BBDD
const sql = require('../lib/sql');                              // Consultas da BBDD
const verify = require('../lib/VerifyToken');                   // Instancia para verificar o token de usuario, empregándoo como middleware para a verificación de token
const helpers = require('../lib/helpers');                      // Instancia para empregar funcionalidades comúns
const tag_traductor = require('../lib/tag_traductor');          // Traductor de etiquetas ao galego

// getAll()
/**
 * Obtén todos os elementos de hospedaxe, indicando cales son favoritos
 */
router.get('/', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;                      // Id de usuario
        var values = [];                                // Array de valores para a query
        if (userId === undefined) {                     // Se o id de usuario non existe, quere dicir que o seu token non foi validado, polo que non hai usuario a ter en conta
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
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag); // Tradúcese a etiqueta do elemento
            });
            // Resposta indicando correctitude e os valores necesarios
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

// getConcreto()
/**
 * Obtén un elemento de hospedaxe concreto, indicando se é favorito
 */
router.get('/concreto/:id', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;              // Id de usuario
        const { id } = req.params;              // Parámetro da petición
        var values = [];                        // Valores da query
        if (userId === undefined) {             // Se non existe o id de usuario, non hai usuario a ter en conta
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(sql.hospedaxe.concreto, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            // Resposta con correctitude e valores
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

// getFavByName()
/**
 * Busca un elemento favorito por nome, indicando se é ou son favoritos
 */
router.get('/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;        // Parámetro da petición
        const userId = req.userId;          // Id de usuario

        const namePerc = '%' + name + '%'   // Engádense porcentaxes para que non busque por coincidencia exacta

        pool.query(sql.hospedaxe.fav.byName, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            // Resposta con correctitude e valores
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// getFilterType()
/**
 * Filtra e ordena elementos dun determinado modo, indicando se son favoritos
 */
router.get('/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;          // Id de usuario
        const { type } = req.params;        // Parámetro da petición

        const query = getQuery(type);       // Obtén a query

        var values = [];                    // Valores da query
        if (userId === undefined) {         // Se o token de usuario non existe, non se ten en conta
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
            // Resposta con correctitude e valores
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }

});

// getFavFilterType()
/**
 * Ordena e filtra elementos favoritos dun determinado modo
 */
router.get('/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;          // Id de usuario
        const { type } = req.params;        // Parámetro da petición

        const query = getFavQuery(type);    // Obtén a query

        var values = [];                    // Valores da petición
        if (userId === undefined) {         // Se o id de usuario non existe, non se ten en conta
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
            // Resposta con correctitude e valores
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }

});

// postFav()
/**
 * Almacena un lugar de hospedaxe como favorito
 */
router.post('/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_lugar_hospedaxe } = req.body;

        if (id_lugar_hospedaxe == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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

// deleteFav()
/**
 * Quita un lugar de hospedaxe como favorito
 */
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

// getByName()
/**
 * Obtén un elemento por nome, indicando se é favorito
 */
 router.get('/:name', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;              // Id de usuario
        var values = [];                        // Valores da query
        if (userId === undefined) {             // Se non existe o id de usuario, non hai usuario a ter en conta
            values.push(-1);
        } else {
            values.push(userId);
        }

        const { name } = req.params;            // Parámetro da petición
        const namePerc = '%' + name + '%'       // Engadimos % para que non busque por coincidencia exacta
        values.push(namePerc);

        pool.query(sql.hospedaxe.byName, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            // Resposta de correctitude e valores
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

/**
 * Obtén unha query dun determinado tipo referente aos favoritos
 * @param {String} type 
 * @returns {String}
 */
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

/**
 * Obtén unha query dun determinado tipo
 * @param {String} type 
 * @returns {String}
 */
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