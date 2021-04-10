const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

var propertiesReader = require('properties-reader');
var properties = propertiesReader('../properties/properties.ini');

router.get('/geoserver/:id', function (req, res) {
    try {
        const { id } = req.params;
        const url = properties.get('geoserver.url') + properties.get('geoserver.item') + id;
        fetch(url).
            then(response => response.json())
            .then(body => {
                res.json(body)
            }
            );
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;