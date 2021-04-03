const express = require('express');
const router = express.Router();
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

var unirest = require("unirest");

const reques = (search) => {

    var req = unirest("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search");

    req.query({
        "q": "Santiago de Compostela " + search,
        "format": "json",
        "accept-language": "es",
        "polygon_threshold": "0.0"
    });

    req.headers({
        "x-rapidapi-key": "1da6b2142emsh77aa78e3d7a30c5p17a577jsnd919400aa9f7",
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
        "useQueryString": true
    });


    req.end(function (res) {
        if (res.error) throw new Error(res.error);

        console.log(res.body);
    });
}

router.get('/nominatim/:search', (req, res) => {
    try {
        const { search } = req.params;
        geocoder.search({
            q: 'Santiago de Compostela ' + search,
            format: 'json',
            "accept-language": 'es'
        })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (err) {
        console.error(err.message)
    }
})

router.get('/nominatim/geojson/:search', (req, res) => {
    try {
        const { search } = req.params;
        geocoder.search({
            q: search,
            format: 'geojson',
            "accept-language": 'es'
        })
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                console.log(error)
            })

    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;