/**
 * @fileoverview Establece a conexión ca base de datos
 * @version 1.0
 * @author Francisco Javier Saa Besteiro <franciscojavier.saa@rai.usc.es>
 * 
 * History
 * v1.0 - Creación do compoñente
*/

const { Pool } = require('pg');                                         // Instancia de pg, que permite a conexión ca base de datos

var propertiesReader = require('properties-reader');                    // Permite a lectura dun arquivo de propiedades .ini
var properties = propertiesReader('../properties/properties.ini');      // Arquivo de propiedades

const config = {                                                        // Configuración da conexión ca BBDD
    host: properties.get('database.host'),
    user: properties.get('database.user'),
    password: properties.get('database.pssw'),
    database: properties.get('database.db')
};

const pool = new Pool(config);                                          // Instancia que permite realizar consultas sobre a BBDD


module.exports = pool;