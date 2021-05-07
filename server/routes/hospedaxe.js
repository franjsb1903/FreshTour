const express = require('express');
const router = express.Router();
const pool = require('../../database/database');
const sql = require('../lib/sql');
const verify = require('../lib/VerifyToken');
const helpers = require('../lib/helpers');
const tag_traductor = require('../lib/tag_traductor');

router.get('/', (req, res) => {

    try {

        pool.query(sql.hospedaxe.all, (err, results) => {
            if (err) {
                helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
                return;
            }
            results.rows.map(element => {
                element.sub_tag = tag_traductor.hospedaxe(element.sub_tag);
            });
            res.status(200).json({
                hospedaxe: results.rows,
                status: 200
            });
        });
    } catch (err) {
        helpers.onError(500, "Erro obtendo os elementos de hospedaxe", err, res);
    }
});

module.exports = router;