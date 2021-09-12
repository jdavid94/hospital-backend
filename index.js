require('dotenv').config();
const path = require('path');
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

// Public Directory
app.use(express.static('public')); // Set an enter point for the app

// Show Env Variables
//console.log(process.env);

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospital', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searchs'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/login', require('./routes/auth'));


//Last
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Server Init
app.listen(process.env.PORT, () => {
    console.log('Server Running on port ' + process.env.PORT);
})