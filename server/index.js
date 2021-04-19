const express = require('express');
const app = express();

const cors = require('cors');
const AuthController = require('./routes/auth/AuthController');
const usuarios = require('./routes/usuarios');

app.use(cors());
app.use(express.json());

app.use(require("./routes/nominatim"));
app.use(require("./routes/turismo"));
app.use(require("./routes/opinions"));
app.use('/auth', AuthController);
app.use('/usuario', usuarios);

const hostname = "192.168.1.71";

app.listen(3000, hostname, () => {
    console.log('Server on port 3000');
});