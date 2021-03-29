const { Pool } = require('pg');

var propertiesReader = require('properties-reader');
var properties = propertiesReader('../properties/properties.ini');

const config = {
    host: properties.get('database.host'),
    user: properties.get('database.user'),
    password: properties.get('database.pssw'),
    database: properties.get('database.db')
};

const pool = new Pool(config);


module.exports = pool;