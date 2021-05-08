const express = require('express');
const app = express();

const cors = require('cors');
const logger = require('morgan');
const fs = require('fs');

app.use(cors());
app.use(express.json());

// registro de conexiones al servidor
app.use(logger('dev'));
app.use(logger('common', { stream: fs.createWriteStream('./log/access.log', { flags: 'a' }) }));
app.use(express.urlencoded({ extended: false }));
// para reconocer json
app.use(express.json());

app.use('/nominatim', require("./routes/nominatim"));
app.use('/turismo', require("./routes/turismo"));
app.use('/opinions', require("./routes/opinions"));
app.use('/auth', require('./routes/auth/AuthController'));
app.use('/usuario', require('./routes/usuarios'));
app.use('/planificacions', require('./routes/planificacions'));
app.use('/hospedaxe', require('./routes/hospedaxe'));

const hostname = "localhost";

app.listen(3000, hostname, () => {
    console.log('Server on port 3000');
});