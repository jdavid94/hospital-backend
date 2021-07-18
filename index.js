require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Created Express Server
const app = express();

// Cors Configuration
app.use(cors());

// DataBase
dbConnection();

// Show Env Variables
//console.log(process.env);

// Routes
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hello World'
    })
});

// Server Init
app.listen(process.env.PORT, () => {
    console.log('Server Listening on port ' + process.env.PORT);
})