const express = require('express');
const tasks = require('../routes/api/tasks');
const customers = require('../routes/api/customers');
const errorMiddleware = require('../middleware/error.js');

//Middlewares and routes

module.exports = function(app) {
   app.use(express.json());
   app.use('/api/tasks', tasks);
   app.use(errorMiddleware);
};
