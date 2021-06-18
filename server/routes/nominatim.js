/**
 * @fileoverview Operacións relacionadas coa busca de lugares polo usuario a xeolocalizar
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');             // Instancia de express
const router = express.Router();                // Instancia de router, que permite crear as rutas

var unirest = require("unirest");               // Módulo que permite o emprego de Nominatim, API de OSM para a busca de elementos a xeolocalizar

/**
 * Obtén información xeográfica a partir da busca do usuario, realizando unha petición a Nomitatim
 * @param {String} query 
 * @param {Object} res 
 * @param {String} format 
 */
const getData = (query, res, format) => {
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
        // Resposta
        res.json(response.body);
    });
};

// getSearch()
/**
 * Obtén a información xeográfica en función da busca do usuario
 */
router.get('/:search', (req, res) => {
    try {
        var { search } = req.params;

        // Necesario para obter unha resposta correcta cando se busca a catedral
        if (search === "Catedral" || search === "Catedral " || search === "catedral" || search === "catedral ") {
            search = "catedral de";
        }
        search = search.toLocaleLowerCase();
        getData(search + " Santiago de Compostela España", res, "json");

    } catch (err) {
        console.error(err.message)
    }
})

// getSearchGeojson()
/**
 * Obtén a información xeográfica en función da busca do usuario en formato geoJSON
 */
router.get('/geojson/:search', (req, res) => {
    try {
        const { search } = req.params;
        getData(search, res, "geojson");
    } catch (err) {
        console.error(err.message)
    }
})

module.exports = router;