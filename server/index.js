const express = require('express');
const app = express();

const cors = require('cors');
const db = require('../database/database');
const pool = require('../database/database');

app.use(cors());
app.use(express.json());

app.use(require("./routes/usuarios"));
app.use(require("./routes/nominatim"));
app.use(require("./routes/turismo"));
app.use(require("./routes/opinions"));

const hostname = "192.168.1.71";

app.listen(3000, hostname, () => {
    console.log('Server on port 3000');
});