const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const tag_traductor = require('../lib/tag_traductor');

// Hostalaria

// getAllHostalaria()
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
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getConcretoHostalaria()
router.get('/hostalaria/concreto/:id', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        const { id } = req.params;
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(sql.lecer.hostalaria.concreto, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hostalaria(element.sub_tag);
            });
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getHostalariaByName()
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
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// postHostalariaFav()
router.post('/hostalaria/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_lugar_hostalaria } = req.body;

        if(id_lugar_hostalaria == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
                return;
        }

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

// deleteHostalariaFav()
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

// getHostalariaFilterType()
router.get('/hostalaria/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getQueryHostalaria(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }

});

// getFavHostalariaByName()
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
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// getFavHostalariaFilterType()
router.get('/hostalaria/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getFavQueryHostalaria(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaria", err, res);
    }

});

const getFavQueryHostalaria = (type) => {
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

const getQueryHostalaria = (type) => {
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

// Actividades de ocio

// getAllOcio()
router.get('/ocio', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(sql.lecer.ocio.valoracion, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.ocio(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getOcioConcreto()
router.get('/ocio/concreto/:id', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { id } = req.params;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(sql.lecer.ocio.concreto, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.ocio(element.sub_tag);
            });
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getOcioByName()
router.get('/ocio/:name', verify.verifyTokenWithoutReturn, (req, res) => {

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

        pool.query(sql.lecer.ocio.byName, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.ocio(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// postOcioFav()
router.post('/ocio/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_actividade_ocio } = req.body;

        if(id_actividade_ocio == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
                return;
        }

        pool.query(sql.lecer.ocio.fav.add, [id_actividade_ocio, userId], (err, results) => {
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

// deleteOcioFav()
router.delete('/ocio/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_actividade_ocio } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_actividade_ocio == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        pool.query(sql.lecer.ocio.fav.delete, [id_actividade_ocio, userId], (err, results) => {
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

// getOcioFilterType()
router.get('/ocio/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getQueryOcio(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                element.sub_tag = tag_traductor.ocio(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }

});

// getFavOcioByName()
router.get('/ocio/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        pool.query(sql.lecer.ocio.fav.byName, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// getFavOcioFilterType()
router.get('/ocio/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getFavQueryOcio(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                element.sub_tag = tag_traductor.ocio(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaria", err, res);
    }

});

const getFavQueryOcio = (type) => {
    switch (type) {
        case "picnic_titulo":
            return sql.lecer.ocio.fav.picnic.titulo;
        case "amusement_arcade_titulo":
            return sql.lecer.ocio.fav.arcade.titulo;
        case "bowling_alley_titulo":
            return sql.lecer.ocio.fav.bolera.titulo;
        case "escape_game_titulo":
            return sql.lecer.ocio.fav.escape_room.titulo;
        case "garden_titulo":
            return sql.lecer.ocio.fav.xardin.titulo;
        case "park_titulo":
            return sql.lecer.ocio.fav.parque.titulo;
        case "playground_titulo":
            return sql.lecer.ocio.fav.parque_infantil.titulo;
        case "stadium_titulo":
            return sql.lecer.ocio.fav.estadio.titulo;
        case "trampoline_park_titulo":
            return sql.lecer.ocio.fav.elasticas.titulo;
        case "pitch_titulo":
            return sql.lecer.ocio.fav.pitch.titulo;
        case "sports_centre_titulo":
            return sql.lecer.ocio.fav.centro_deportivo.titulo;
        case "outdoor_seating_titulo":
            return sql.lecer.ocio.fav.terraza.titulo;
        case "dance_titulo":
            return sql.lecer.ocio.fav.baile.titulo;
        case "sports_hall_titulo":
            return sql.lecer.ocio.fav.pabellon.titulo;
        case "cinema_titulo":
            return sql.lecer.ocio.fav.cine.titulo;
        case "theatre_titulo":
            return sql.lecer.ocio.fav.teatro.titulo;
        case "nightclub_titulo":
            return sql.lecer.ocio.fav.club_nocturno.titulo;
        case "viewpoint_titulo":
            return sql.lecer.ocio.fav.mirador.titulo;
        case "picnic_valoracion":
            return sql.lecer.ocio.fav.picnic.valoracion;
        case "amusement_arcade_valoracion":
            return sql.lecer.ocio.fav.arcade.valoracion;
        case "bowling_alley_valoracion":
            return sql.lecer.ocio.fav.bolera.valoracion;
        case "escape_game_valoracion":
            return sql.lecer.ocio.fav.escape_room.valoracion;
        case "garden_valoracion":
            return sql.lecer.ocio.fav.xardin.valoracion;
        case "park_valoracion":
            return sql.lecer.ocio.fav.parque.valoracion;
        case "playground_valoracion":
            return sql.lecer.ocio.fav.parque_infantil.valoracion;
        case "stadium_valoracion":
            return sql.lecer.ocio.fav.estadio.valoracion;
        case "trampoline_park_valoracion":
            return sql.lecer.ocio.fav.elasticas.valoracion;
        case "pitch_valoracion":
            return sql.lecer.ocio.fav.pitch.valoracion;
        case "sports_centre_valoracion":
            return sql.lecer.ocio.fav.centro_deportivo.valoracion;
        case "outdoor_seating_valoracion":
            return sql.lecer.ocio.fav.terraza.valoracion;
        case "dance_valoracion":
            return sql.lecer.ocio.fav.baile.valoracion;
        case "sports_hall_valoracion":
            return sql.lecer.ocio.fav.pabellon.valoracion;
        case "cinema_valoracion":
            return sql.lecer.ocio.fav.cine.valoracion;
        case "theatre_valoracion":
            return sql.lecer.ocio.fav.teatro.valoracion;
        case "nightclub_valoracion":
            return sql.lecer.ocio.fav.club_nocturno.valoracion;
        case "viewpoint_valoracion":
            return sql.lecer.ocio.fav.mirador.valoracion;
        case "all_valoracion":
            return sql.lecer.ocio.fav.valoracion;
        case "all_titulo":
            return sql.lecer.ocio.fav.titulo;
        default:
            return undefined;
    }
}

const getQueryOcio = (type) => {
    switch (type) {
        case "picnic_titulo":
            return sql.lecer.ocio.picnic.titulo;
        case "amusement_arcade_titulo":
            return sql.lecer.ocio.arcade.titulo;
        case "bowling_alley_titulo":
            return sql.lecer.ocio.bolera.titulo;
        case "escape_game_titulo":
            return sql.lecer.ocio.escape_room.titulo;
        case "garden_titulo":
            return sql.lecer.ocio.xardin.titulo;
        case "park_titulo":
            return sql.lecer.ocio.parque.titulo;
        case "playground_titulo":
            return sql.lecer.ocio.parque_infantil.titulo;
        case "stadium_titulo":
            return sql.lecer.ocio.estadio.titulo;
        case "trampoline_park_titulo":
            return sql.lecer.ocio.elasticas.titulo;
        case "pitch_titulo":
            return sql.lecer.ocio.pitch.titulo;
        case "sports_centre_titulo":
            return sql.lecer.ocio.centro_deportivo.titulo;
        case "outdoor_seating_titulo":
            return sql.lecer.ocio.terraza.titulo;
        case "dance_titulo":
            return sql.lecer.ocio.baile.titulo;
        case "sports_hall_titulo":
            return sql.lecer.ocio.pabellon.titulo;
        case "cinema_titulo":
            return sql.lecer.ocio.cine.titulo;
        case "theatre_titulo":
            return sql.lecer.ocio.teatro.titulo;
        case "nightclub_titulo":
            return sql.lecer.ocio.club_nocturno.titulo;
        case "viewpoint_titulo":
            return sql.lecer.ocio.mirador.titulo;
        case "picnic_valoracion":
            return sql.lecer.ocio.picnic.valoracion;
        case "amusement_arcade_valoracion":
            return sql.lecer.ocio.arcade.valoracion;
        case "bowling_alley_valoracion":
            return sql.lecer.ocio.bolera.valoracion;
        case "escape_game_valoracion":
            return sql.lecer.ocio.escape_room.valoracion;
        case "garden_valoracion":
            return sql.lecer.ocio.xardin.valoracion;
        case "park_valoracion":
            return sql.lecer.ocio.parque.valoracion;
        case "playground_valoracion":
            return sql.lecer.ocio.parque_infantil.valoracion;
        case "stadium_valoracion":
            return sql.lecer.ocio.estadio.valoracion;
        case "trampoline_park_valoracion":
            return sql.lecer.ocio.elasticas.valoracion;
        case "pitch_valoracion":
            return sql.lecer.ocio.pitch.valoracion;
        case "sports_centre_valoracion":
            return sql.lecer.ocio.centro_deportivo.valoracion;
        case "outdoor_seating_valoracion":
            return sql.lecer.ocio.terraza.valoracion;
        case "dance_valoracion":
            return sql.lecer.ocio.baile.valoracion;
        case "sports_hall_valoracion":
            return sql.lecer.ocio.pabellon.valoracion;
        case "cinema_valoracion":
            return sql.lecer.ocio.cine.valoracion;
        case "theatre_valoracion":
            return sql.lecer.ocio.teatro.valoracion;
        case "nightclub_valoracion":
            return sql.lecer.ocio.club_nocturno.valoracion;
        case "viewpoint_valoracion":
            return sql.lecer.ocio.mirador.valoracion;
        case "all_valoracion":
            return sql.lecer.ocio.valoracion;
        case "all_titulo":
            return sql.lecer.ocio.titulo;
        default:
            return undefined;
    }
}

// Outras actividades

// getAllOutras()
router.get('/outras', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }

        pool.query(sql.lecer.outras.valoracion, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.outras(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getOutrasConcreto()
router.get('/outras/concreto/:id', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { id } = req.params;
        var values = [];
        if (userId === undefined) {
            values.push(-1);
        } else {
            values.push(userId);
        }
        values.push(id);

        pool.query(sql.lecer.outras.concreto, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.outras(element.sub_tag);
            });
            res.status(200).json({
                elemento: results.rows[0],
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// getOutrasByName()
router.get('/outras/:name', verify.verifyTokenWithoutReturn, (req, res) => {

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

        pool.query(sql.lecer.outras.byName, values, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.outras(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }
});

// postOutrasFav()
router.post('/outras/fav', verify.verifyToken, (req, res) => {

    try {
        const userId = req.userId;
        const { id_outra_actividade } = req.body;

        if(id_outra_actividade == undefined) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

        pool.query(sql.lecer.outras.fav.add, [id_outra_actividade, userId], (err, results) => {
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

// deleteOutrasFav()
router.delete('/outras/fav', verify.verifyToken, (req, res) => {

    try {
        const { id_outra_actividade } = req.body;
        const userId = req.userId;

        if (userId == undefined || id_outra_actividade == undefined) {
            helpers.onError(500, "Erro quitando elemento como favorito no servidor", undefined, res);
            return;
        }

        pool.query(sql.lecer.outras.fav.delete, [id_outra_actividade, userId], (err, results) => {
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

// getOutrasFilterType()
router.get('/outras/filter/:type', verify.verifyTokenWithoutReturn, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getQueryOutras(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                element.sub_tag = tag_traductor.outras(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaría", err, res);
    }

});

// getFavOutrasByName()
router.get('/outras/fav/:name', verify.verifyToken, (req, res) => {
    try {
        const { name } = req.params;
        const userId = req.userId;

        const namePerc = '%' + name + '%'

        pool.query(sql.lecer.outras.fav.byName, [userId, namePerc], (err, results) => {
            if (err) {
                helpers.onError(500, "Erro na busca", err, res);
                return;
            }
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro interno do servidor", err, res);
    }
});

// getFavOutrasFilterType()
router.get('/outras/fav/filter/:type', verify.verifyToken, (req, res) => {

    try {

        const userId = req.userId;
        const { type } = req.params;

        const query = getFavQueryOutras(type);

        if (!query) {
            helpers.onError(500, "Erro interno do servidor", undefined, res);
            return;
        }

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
                element.sub_tag = tag_traductor.outras(element.sub_tag);
            });
            res.status(200).json({
                lecer: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hostalaria", err, res);
    }

});

const getFavQueryOutras = (type) => {
    switch (type) {
        case "bank_titulo":
            return sql.lecer.outras.fav.bancos.titulo;
        case "pharmacy_titulo":
            return sql.lecer.outras.fav.farmacias.titulo;
        case "post_office_titulo":
            return sql.lecer.outras.fav.correos.titulo;
        case "taxi_titulo":
            return sql.lecer.outras.fav.taxis.titulo;
        case "police_titulo":
            return sql.lecer.outras.fav.policia.titulo;
        case "bicycle_parking_titulo":
            return sql.lecer.outras.fav.parking_bici.titulo;
        case "atm_titulo":
            return sql.lecer.outras.fav.caixeiro.titulo;
        case "toilets_titulo":
            return sql.lecer.outras.fav.baños.titulo;
        case "supermarket_titulo":
            return sql.lecer.outras.fav.supers.titulo;
        case "convenience_titulo":
            return sql.lecer.outras.fav.supers_peque.titulo;
        case "seafood_titulo":
            return sql.lecer.outras.fav.pescaderias.titulo;
        case "butcher_titulo":
            return sql.lecer.outras.fav.carnicerias.titulo;
        case "clothes_titulo":
            return sql.lecer.outras.fav.tendas_roupa.titulo;
        case "gift_titulo":
            return sql.lecer.outras.fav.tendas_regalos.titulo;
        case "shoes_titulo":
            return sql.lecer.outras.fav.tendas_zapatos.titulo;
        case "beverages_titulo":
            return sql.lecer.outras.fav.tendas_bebidas.titulo;
        case "department_store_titulo":
            return sql.lecer.outras.fav.grandes_almacenes.titulo;
        case "bag_titulo":
            return sql.lecer.outras.fav.tendas_bolsas.titulo;
        case "perfumery_titulo":
            return sql.lecer.outras.fav.perfumerias.titulo;
        case "information_titulo":
            return sql.lecer.outras.fav.informacion.titulo;
        case "hospital_titulo":
            return sql.lecer.outras.fav.hospitais.titulo;
        case "clinic_titulo":
            return sql.lecer.outras.fav.clinicas.titulo;
        case "photo_titulo":
            return sql.lecer.outras.fav.tenda_fotos.titulo;
        case "bank_valoracion":
            return sql.lecer.outras.fav.bancos.valoracion;
        case "pharmacy_valoracion":
            return sql.lecer.outras.fav.farmacias.valoracion;
        case "post_office_valoracion":
            return sql.lecer.outras.fav.correos.valoracion;
        case "taxi_valoracion":
            return sql.lecer.outras.fav.taxis.valoracion;
        case "police_valoracion":
            return sql.lecer.outras.fav.policia.valoracion;
        case "bicycle_parking_valoracion":
            return sql.lecer.outras.fav.parking_bici.valoracion;
        case "atm_valoracion":
            return sql.lecer.outras.fav.caixeiro.valoracion;
        case "toilets_valoracion":
            return sql.lecer.outras.fav.baños.valoracion;
        case "supermarket_valoracion":
            return sql.lecer.outras.fav.supers.valoracion;
        case "convenience_valoracion":
            return sql.lecer.outras.fav.supers_peque.valoracion;
        case "seafood_valoracion":
            return sql.lecer.outras.fav.pescaderias.valoracion;
        case "butcher_valoracion":
            return sql.lecer.outras.fav.carnicerias.valoracion;
        case "clothes_valoracion":
            return sql.lecer.outras.fav.tendas_roupa.valoracion;
        case "gift_valoracion":
            return sql.lecer.outras.fav.tendas_regalos.valoracion;
        case "shoes_valoracion":
            return sql.lecer.outras.fav.tendas_zapatos.valoracion;
        case "beverages_valoracion":
            return sql.lecer.outras.fav.tendas_bebidas.valoracion;
        case "department_store_valoracion":
            return sql.lecer.outras.fav.grandes_almacenes.valoracion;
        case "bag_valoracion":
            return sql.lecer.outras.fav.tendas_bolsas.valoracion;
        case "perfumery_valoracion":
            return sql.lecer.outras.fav.perfumerias.valoracion;
        case "information_valoracion":
            return sql.lecer.outras.fav.informacion.valoracion;
        case "hospital_valoracion":
            return sql.lecer.outras.fav.hospitais.valoracion;
        case "clinic_valoracion":
            return sql.lecer.outras.fav.clinicas.valoracion;
        case "photo_valoracion":
            return sql.lecer.outras.fav.tenda_fotos.valoracion;
        case "all_titulo":
            return sql.lecer.outras.fav.titulo;
        case "all_valoracion":
            return sql.lecer.outras.fav.valoracion;
        default:
            return undefined;
    }
}

const getQueryOutras = (type) => {
    switch (type) {
        case "bank_titulo":
            return sql.lecer.outras.bancos.titulo;
        case "pharmacy_titulo":
            return sql.lecer.outras.farmacias.titulo;
        case "post_office_titulo":
            return sql.lecer.outras.correos.titulo;
        case "taxi_titulo":
            return sql.lecer.outras.taxis.titulo;
        case "police_titulo":
            return sql.lecer.outras.policia.titulo;
        case "bicycle_parking_titulo":
            return sql.lecer.outras.parking_bici.titulo;
        case "atm_titulo":
            return sql.lecer.outras.caixeiro.titulo;
        case "toilets_titulo":
            return sql.lecer.outras.baños.titulo;
        case "supermarket_titulo":
            return sql.lecer.outras.supers.titulo;
        case "convenience_titulo":
            return sql.lecer.outras.supers_peque.titulo;
        case "seafood_titulo":
            return sql.lecer.outras.pescaderias.titulo;
        case "butcher_titulo":
            return sql.lecer.outras.carnicerias.titulo;
        case "clothes_titulo":
            return sql.lecer.outras.tendas_roupa.titulo;
        case "gift_titulo":
            return sql.lecer.outras.tendas_regalos.titulo;
        case "shoes_titulo":
            return sql.lecer.outras.tendas_zapatos.titulo;
        case "beverages_titulo":
            return sql.lecer.outras.tendas_bebidas.titulo;
        case "department_store_titulo":
            return sql.lecer.outras.grandes_almacenes.titulo;
        case "bag_titulo":
            return sql.lecer.outras.tendas_bolsas.titulo;
        case "perfumery_titulo":
            return sql.lecer.outras.perfumerias.titulo;
        case "information_titulo":
            return sql.lecer.outras.informacion.titulo;
        case "hospital_titulo":
            return sql.lecer.outras.hospitais.titulo;
        case "clinic_titulo":
            return sql.lecer.outras.clinicas.titulo;
        case "photo_titulo":
            return sql.lecer.outras.tenda_fotos.titulo;
        case "bank_valoracion":
            return sql.lecer.outras.bancos.valoracion;
        case "pharmacy_valoracion":
            return sql.lecer.outras.farmacias.valoracion;
        case "post_office_valoracion":
            return sql.lecer.outras.correos.valoracion;
        case "taxi_valoracion":
            return sql.lecer.outras.taxis.valoracion;
        case "police_valoracion":
            return sql.lecer.outras.policia.valoracion;
        case "bicycle_parking_valoracion":
            return sql.lecer.outras.parking_bici.valoracion;
        case "atm_valoracion":
            return sql.lecer.outras.caixeiro.valoracion;
        case "toilets_valoracion":
            return sql.lecer.outras.baños.valoracion;
        case "supermarket_valoracion":
            return sql.lecer.outras.supers.valoracion;
        case "convenience_valoracion":
            return sql.lecer.outras.supers_peque.valoracion;
        case "seafood_valoracion":
            return sql.lecer.outras.pescaderias.valoracion;
        case "butcher_valoracion":
            return sql.lecer.outras.carnicerias.valoracion;
        case "clothes_valoracion":
            return sql.lecer.outras.tendas_roupa.valoracion;
        case "gift_valoracion":
            return sql.lecer.outras.tendas_regalos.valoracion;
        case "shoes_valoracion":
            return sql.lecer.outras.tendas_zapatos.valoracion;
        case "beverages_valoracion":
            return sql.lecer.outras.tendas_bebidas.valoracion;
        case "department_store_valoracion":
            return sql.lecer.outras.grandes_almacenes.valoracion;
        case "bag_valoracion":
            return sql.lecer.outras.tendas_bolsas.valoracion;
        case "perfumery_valoracion":
            return sql.lecer.outras.perfumerias.valoracion;
        case "information_valoracion":
            return sql.lecer.outras.informacion.valoracion;
        case "hospital_valoracion":
            return sql.lecer.outras.hospitais.valoracion;
        case "clinic_valoracion":
            return sql.lecer.outras.clinicas.valoracion;
        case "photo_valoracion":
            return sql.lecer.outras.tenda_fotos.valoracion;
        case "all_titulo":
            return sql.lecer.outras.titulo;
        case "all_valoracion":
            return sql.lecer.outras.valoracion;
        default:
            return undefined;
    }
}

module.exports = router;