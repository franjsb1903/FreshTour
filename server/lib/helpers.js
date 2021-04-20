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

helpers.onCorrectAuth = (token, user, res, planificacionsFav, planificacions, opinions, elementosFav) => {
    return res.status(200).send({ auth: true, token: token, user: user, planificacionsFav: planificacionsFav, planificacions: planificacions, opinions: opinions, elementosFav: elementosFav });
}

module.exports = helpers;