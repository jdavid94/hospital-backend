require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Created Express Server
const app = express();

// Cors Configuration
app.use(cors());

// Read and Pars BODY
app.use(express.json());

// DataBase
dbConnection();

// Show Env Variables
//console.log(process.env);

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospital', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searchs'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/login', require('./routes/auth'));


// Server Init
app.listen(process.env.PORT, () => {
    console.log('Server Running on port ' + process.env.PORT);
})