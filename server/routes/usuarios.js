var express = require('express');
var router = express.Router();

const helpers = require('../lib/helpers');

const pool = require('../../database/database');
const verify = require('../lib/VerifyToken');

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

const onAddFav = (query, id_usuario, id_elemento, res) => {
    pool.query(query, [id_usuario, id_elemento], (err, results) => {
        if (err) {
            helpers.onError(500, "Erro interno do servidor", err, res);
            return;
        }
        res.json({
            status: 200
        });
    });
}

router.post('/turismo/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_elemento, type } = req.body;
        const userId = req.userId;
        console.log(userId);
        console.log(id_elemento);
        console.log(type);

        if(userId == undefined || id_elemento == undefined || type == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        const lugar_turistico = "INSERT INTO fresh_tour.lugares_turisticos_favoritos (id_usuario, id_lugar_turistico) values ($1, $2)";
        const monumento = "INSERT INTO fresh_tour.monumentos_favoritos (id_usuario, id_monumento) values ($1, $2)";
        const planificacion = "INSERT INTO fresh_tour.planificacions_favoritas (id_usuario, id_planificacion) values ($1, $2)";

        if (type === "Lugar turistico") {
            onAddFav(lugar_turistico, userId, id_elemento, res);
        } else if (type === "Monumento") {
            onAddFav(monumento, userId, id_elemento, res);
        } else {
            onAddFav(planificacion, userId, id_elemento, res);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }



});

module.exports = router;