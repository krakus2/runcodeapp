const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateProfileInput = require('../../validators/task');
const splitArray = require('../../utils/utils');

const Task = require('../../models/Task');

// @route   GET api/tasks/test
// @desc    Test tasks route
// @access  Public
router.get('/test', (req, res) => {
   res.json({
      msg: 'profiles test work'
   });
});

// @route   GET api/tasks/
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
   let tasks = await Task.find()
      .sort({ _id: -1 }) //zwróci od najnowszych
      .limit(5);
   let result = [];
   // for(let i = 0; i < tasks.length; i++)
   /*for(let i = 0; i < tasks.length; i++){
      result[i]
      result[i] = tasks.map((elem, i, array) => {
         const object = {};
         object.MethodName = elem.tytulZadania;
         object.Parameters = []
         elem.wyniki.forEach((elem2, i) => {
            object.Parameters.push({
               TypeName: `System.${}32`
            })
         })
      })
   }*/

   res.json(tasks);
});

// @route   POST api/tasks/
// @desc    Post new task
// @access  Public
router.post('/', async (req, res) => {
   const { errors, isValid } = validateProfileInput(req.body);

   // Check Validation
   if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
   }

   let task = new Task({
      tytulZadania: req.body.tytulZadania,
      opisZadania: req.body.opisZadania,
      iloscArg: req.body.iloscArg,
      iloscWynikow: req.body.iloscWynikow,
      args: req.body.args,
      returnArgs: req.body.returnArgs,
      wyniki: req.body.wyniki,
      czyRekurencja: req.body.czyRekurencja
   });
   task = await task.save();
   res.send(task);
});

module.exports = router;
