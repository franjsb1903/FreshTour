const helpers = {};

helpers.onError = (code, message, err, res) => {
    console.error(err.message);
    return res.status(500).json({
        status: code,
        message: message
    });
}

module.exports = helpers;