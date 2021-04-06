const express = require('express');
const router = express.Router();
const Nominatim = require('nominatim-geocoder')
const geocoder = new Nominatim()

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