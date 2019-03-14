const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
require('dotenv').config();

//Connect to MongoDB
module.exports = function() {
   mongoose
      .connect(config.get('mongoUrl'), { useNewUrlParser: true })
      .then(() =>
         winston.info(
            `MongoDB connected, ${
               process.env.NODE_ENV === 'production' ||
               process.env.NODE_ENV === 'development'
                  ? 'Production DB'
                  : 'Test DB'
            }`
         )
      );
};
