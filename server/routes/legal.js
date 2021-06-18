/**
 * @fileoverview Operacións relacionadas con aspectos legais na aplicación
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');             // Instancia de express
const router = express.Router();                // Instancia de router, que permite crear as rutas
const path = require('path');                   // Instancia do módulo path, para acceder a directorios

// getCondicions()
/**
 * Devolve un arquivo HTML cas condicións de uso da aplicación
 */
router.get('/condicions', (req, res) => {
    res.sendFile(path.join(__dirname, '../legal/condicions.html'));
});

module.exports = router;