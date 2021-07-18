const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error Init DataBase See Logs');
    }
}

// To Export and User globally
module.exports = {
    dbConnection
}