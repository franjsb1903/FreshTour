/**
 * @fileoverview Arquivo que contén a instancia do servidor en si mesma e sobre o que se levanta este mesmo
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación das funcionalidades
*/

const express = require('express');         // Módulo express

// inicialización
const app = express();                      // Instancia de express, que correspóndese ca instancia do servidor

const cors = require('cors');               // Módulo cors, que habilita a opción cors nas peticións
const logger = require('morgan');           // Módulo para rexistro de peticións web
const fs = require('fs');                   // Módulo para empregar o file system no servidor
var propertiesReader = require('properties-reader');                    // Permite a lectura dun arquivo de propiedades .ini
var properties = propertiesReader('../properties/properties.ini');      // Arquivo de propiedades

// middlewares
app.use(cors());                            // Habilitación de cors nas peticións
app.use(express.json());                    // Reconocer JSON nas peticións
app.use(logger('dev'));                     // Rexistro de peticións web na consola
// Rexistro de peticións web no arquivo de log
app.use(logger('common', { stream: fs.createWriteStream('./log/access.log', { flags: 'a' }) }));
// Para poder aceptar dende os formularios os datos que envían os usuarios, indicando que solo se aceptan datos sinxelos
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/nominatim', require("./routes/nominatim"));
app.use('/turismo', require("./routes/turismo"));
app.use('/opinions', require("./routes/opinions"));
app.use('/auth', require('./routes/auth/AuthController'));
app.use('/usuario', require('./routes/usuarios'));
app.use('/planificacions', require('./routes/planificacions'));
app.use('/hospedaxe', require('./routes/hospedaxe'));
app.use('/lecer', require('./routes/lecer'));
app.use('/legal', require('./routes/legal'));

// Inicio do servidor
const hostname = properties.get('server.host');
const port = properties.get('server.port');

app.listen(port, hostname, () => {
    console.log('Server on port 3000');
});