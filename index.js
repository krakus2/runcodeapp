const express = require('express');
require('dotenv').config();
//const debug = require('debug')('app:startup');
const app = express();
const winston = require('winston');
const path = require('path');

require('express-async-errors');
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

if (process.env.NODE_ENV === 'production') {
   //set static folder
   app.use(express.static('client/build'));
   //for any route that isn't hit with routes/api use this route
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
   winston.info(`Port is listening on ${port}`);
});

module.exports = server;
