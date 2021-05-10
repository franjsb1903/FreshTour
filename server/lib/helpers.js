const helpers = {};

helpers.onError = (code, message, err, res) => {
    if (err)
        console.error(err.message);
    return res.status(code).json({
        status: code,
        message: message
    });
}

helpers.onErrorAuth = (code, message, err, res) => {
    if (err) {
        console.error(err.message);
    }
    return res.status(code).json({
        message: message,
        auth: false,
        token: null
    });
}

helpers.onError = (code, message, err, res) => {
    if(err) {
        console.error(err.message);
    }
    return res.status(code).json({
        message: message,
        status: code
    });
}

helpers.onCorrectAuth = (token, user, res, planificacionsFav, planificacions, opinions, elementosFav, hospedaxeFav) => {
    return res.status(200).send({ auth: true, token: token, user: user, planificacionsFav: planificacionsFav, planificacions: planificacions, opinions: opinions, elementosFav: elementosFav, hospedaxesFav: hospedaxeFav });
}

helpers.onExecuteQuery = (query, id_usuario, id_elemento, res, pool) => {
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

module.exports = helpers;