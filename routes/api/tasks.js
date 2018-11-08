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
router.get('/all', async (req, res) => {
    let tasks = await Task.find().sort({ _id: -1 }); //zwróci od najnowszych

    res.json(tasks);
});

// @route   GET api/tasks/
// @desc    Get all tasks
// @access  Public
router.get('/', async (req, res) => {
    let tasks = await Task.find().sort({ _id: -1 }); //zwróci od najnowszych
    let result = [];
    for (let i = 0; i < tasks[0].iloscWynikow; i++) {
        let object = {};
        object.MethodName = tasks[0].tytulZadania;
        object.code = tasks[0].code;
        object.Parameters = [];
        for (let j = 0; j < tasks[0].iloscArg; j++) {
            const paramObject = {};
            paramObject.TypeName =
                tasks[0].args[j * 2] === 'Typ prosty'
                    ? `System.${tasks[0].args[j * 2 + 1]}32`
                    : `System.${tasks[0].args[j * 2 + 1]}32[]`;
            paramObject.Value =
                tasks[0].args[j * 2] === 'Typ prosty'
                    ? `${tasks[0].wyniki[j]}`
                    : `[${tasks[0].wyniki[j]}]`;
        }
        object.ResultTypeName =
            tasks[0].returnArgs[0] === 'Typ prosty'
                ? `System.${tasks[0].returnArgs[1]}`
                : `System.${tasks[0].returnArgs[1]}[]`;

        object.ExpectedResult = tasks[0].wyniki[(tasks[0].iloscArg + 1) * (i + 1)] === 'Typ prosty';
        object.CodeChecks = tasks[0].czyRekurencja;
        result.push(object);
    }

    res.json(result);
});

// @route   GET api/tasks/
// @desc    Get x last tasks
// @access  Public
router.get('/:x', async (req, res) => {
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

// @route   GET api/tasks/
// @desc    Get all unread tasks
// @access  Public
router.get('/unread', async (req, res) => {
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

// @route   GET api/tasks/
// @desc    Get all tasks from x days
// @access  Public
router.get('/days/:x', async (req, res) => {
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
        imieINazwisko: req.body.imieINazwisko,
        nazwaFunkcji: req.body.nazwaFunkcji,
        tytulZadania: req.body.tytulZadania,
        opisZadania: req.body.opisZadania,
        iloscArg: req.body.iloscArg,
        iloscWynikow: req.body.iloscWynikow,
        args: req.body.args,
        returnArgs: req.body.returnArgs,
        code: req.body.code,
        wyniki: req.body.wyniki,
        czyRekurencja: req.body.czyRekurencja
    });
    task = await task.save();
    res.send(task);
});

module.exports = router;
