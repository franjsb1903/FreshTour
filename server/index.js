const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(express.json());

// registro de conexiones al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
// para reconocer json
app.use(express.json());

app.use('/nominatim', require("./routes/nominatim"));
app.use('/turismo', require("./routes/turismo"));
app.use('/opinions', require("./routes/opinions"));
app.use('/auth', require('./routes/auth/AuthController'));
app.use('/usuario', require('./routes/usuarios'));
app.use('/planificacions', require('./routes/planificacions'));

const hostname = "192.168.1.74";

app.listen(3000, hostname, () => {
    console.log('Server on port 3000');
});