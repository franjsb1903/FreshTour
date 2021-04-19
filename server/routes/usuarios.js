var express = require('express');
var router = express.Router();

const helpers = require('../lib/helpers');

const pool = require('../../database/database');

router.use(express.urlencoded({
    extended: true
}));
router.use(express.json());

const onAddFav = (query, id_usuario, id_elemento, res) => {
    pool.query(query, [id_usuario, id_elemento], (err, results) => {
        if (err) {
            helpers.onError(500, "Erro interno do servidor", err, res)
        }
        res.json({
            status: 200
        });
    });
}

router.post('/turismo/fav', (req, res) => {

    try {
        const { id_usuario, id_elemento, type } = req.body;

        console.log(req.body);

        const lugar_turistico = "INSERT INTO fresh_tour.lugares_turisticos_favoritos (id_usuario, id_lugar_turistico) values ($1, $2)";
        const monumento = "INSERT INTO fresh_tour.monumentos_favoritos (id_usuario, id_monumento) values ($1, $2)";
        const planificacion = "INSERT INTO fresh_tour.planificacions_favoritas (id_usuario, id_planificacion) values ($1, $2)";

        if (type === "Lugar turistico") {
            onAddFav(lugar_turistico, id_usuario, id_elemento, res);
        } else if (type === "Monumento") {
            onAddFav(monumento, id_usuario, id_elemento, res);
        } else {
            onAddFav(planificacion, id_usuario, id_elemento, res);
        }
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }



});

module.exports = router;