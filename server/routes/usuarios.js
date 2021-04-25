var express = require('express');
var router = express.Router();

const helpers = require('../lib/helpers');

const pool = require('../../database/database');
const verify = require('../lib/VerifyToken');

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

router.post('/turismo/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if(userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const lugar_turistico = "INSERT INTO fresh_tour.lugares_turisticos_favoritos (id_usuario, id_lugar_turistico) values ($1, $2)";
        const monumento = "INSERT INTO fresh_tour.monumentos_favoritos (id_usuario, id_monumento) values ($1, $2)";
        const planificacion = "INSERT INTO fresh_tour.planificacions_favoritas (id_usuario, id_planificacion) values ($1, $2)";

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

router.delete('/turismo/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;

        if(userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        const lugar_turistico = "DELETE FROM fresh_tour.lugares_turisticos_favoritos WHERE id_usuario = $1 and id_lugar_turistico = $2";
        const monumento = "DELETE FROM fresh_tour.monumentos_favoritos WHERE id_usuario = $1 and id_monumento = $2";
        const planificacion = "DELETE FROM fresh_tour.planificacions_favoritas WHERE id_usuario = $1 and id_planificacion = $2";

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

router.get('/turismo/fav/', verify.verifyToken, (req, res) => {
    try {
        const userId = req.userId;

        const elementos_favoritos = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1)";
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
    } catch(err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

router.get('/turismo/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        const elementos_favoritos = "SELECT *, 'Monumento' as tipo, true AS favorito FROM fresh_tour.monumentos m WHERE id IN ( SELECT id_monumento FROM fresh_tour.monumentos_favoritos mf WHERE id_usuario = $1) and titulo LIKE $2 UNION ALL SELECT *, 'Lugar turístico' as tipo, true AS favorito FROM fresh_tour.lugares_turisticos lt WHERE id IN ( SELECT id_lugar_turistico FROM fresh_tour.lugares_turisticos_favoritos ltf WHERE id_usuario = $1) and titulo LIKE $2";
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
    } catch(err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

module.exports = router;