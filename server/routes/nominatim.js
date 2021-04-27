const express = require('express');
const router = express.Router();

var unirest = require("unirest");

const getData = (query, res, format) => {
    console.log(query);
    var request = unirest("GET", "https://forward-reverse-geocoding.p.rapidapi.com/v1/search");
    request.query({
        "q": query,
        "format": format,
        "addressdetails": "1",
        "accept-language": "es",
        "countrycodes": "es",
        "limit": "20"
    });

    request.headers({
        "x-rapidapi-key": "1da6b2142emsh77aa78e3d7a30c5p17a577jsnd919400aa9f7",
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
        "useQueryString": true
    });


    request.end(function (response) {
        if (res.error) throw new Error(res.error);
        res.json(response.body);
    });
};

router.get('/:search', (req, res) => {
    try {
        var { search } = req.params;

        if (search === "Catedral" || search === "Catedral " || search === "catedral" || search === "catedral ") {
            search = "catedral de";
        }
        search = search.toLocaleLowerCase();
        getData(search + " Santiago de Compostela España", res, "json");

    } catch (err) {
        console.error(err.message)
    }
})

router.get('/geojson/:search', (req, res) => {
    try {
        const { search } = req.params;
        getData(search, res, "geojson");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;