const helpers = {};

helpers.onError = (code, message, err, res) => {
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

helpers.onCorrectAuth = (token, user, res) => {
    return res.status(200).send({ auth: true, token: token, user: user });
}

module.exports = helpers;