const mongoose = require('mongoose');
require('dotenv').config();

const URL_DB = process.env.MONGO_URL;

mongoose.connect(URL_DB);

const database = mongoose.connection;

module.exports = database;