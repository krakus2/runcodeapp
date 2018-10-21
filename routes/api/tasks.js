const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const validateProfileInput = require('../../validators/task');

const { Task } = require('../../models/Task');

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
   let tasks = await Task.find().sort({ tytulZadania: 1 });
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

   // Get fields
   const taskFields = {};
   taskFields.tytulZadania = req.body.tytulZadania;
   taskFields.opisZadania = req.body.opisZadania;
   profileFields.iloscArg = req.body.iloscArg;
   profileFields.iloscWynikow = req.body.iloscWynikow;
   profileFields.args = req.body.args;
   profileFields.returnArgs = req.body.returnArgs;
   profileFields.wyniki = req.body.wyniki;
   profileFields.czyRekurencja = req.body.czyRekurencja;

   let task = new Task({ ...taskFields });
   console.log(task);
   task = await task.save();
   res.send(result);
});

module.exports = router;
