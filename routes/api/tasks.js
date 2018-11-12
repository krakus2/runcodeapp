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
    let resultAll = [];
    for(let k = 0; k < tasks.length; k++) {
        let result = [];
        for (let i = 0; i < tasks[k].iloscWynikow; i++) {
            let object = {};
            object.MethodName = tasks[k].nazwaFunkcji;
            object.code = tasks[k].code.replace((/  |\r\n|\n|\r/gm),"") //usuwa wszystkie tabulacje i znaki nowej linii
            object.Parameters = [];
            for (let j = 0; j < tasks[k].iloscArg; j++) {
                const paramObject = {};
                paramObject.TypeName =
                    tasks[k].args[j * 2] === 'Typ prosty'
                        ? `System.${tasks[k].args[j * 2 + 1]}`
                        : `System.${tasks[k].args[j * 2 + 1]}[]`;
                paramObject.Value =
                    tasks[k].args[j * 2] === 'Typ prosty'
                        ? `${tasks[k].wyniki[j]}`
                        : `[${tasks[k].wyniki[j]}]`;
                object.Parameters.push(paramObject)
            }
            object.ResultTypeName =
                tasks[k].returnArgs[k] === 'Typ prosty'
                    ? `System.${tasks[k].returnArgs[1]}`
                    : `System.${tasks[k].returnArgs[1]}[]`;

            object.ExpectedResult = 
                tasks[k].returnArgs[k] === 'Typ prosty'
                    ? `${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}`
                    : `[${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}]`;
            object.CodeChecks = tasks[k].czyRekurencja ? ["RecursionCheck"] : []; 
            result.push(object);
        }
        resultAll.push(result)
    }

    res.json(resultAll);
});

// @route   GET api/tasks/
// @desc    Get x last tasks
// @access  Public
router.get('/ileostatnich/:x', async (req, res) => {
    const ile = parseInt(req.params.x)
    if(!Number.isInteger(ile) || ile <= 0){
        return res.status(400).send("Podałeś błędny parametr, to musi być liczba całkowita większa od 0");
    } else {
        let tasks = await Task.find()
        .sort({ _id: -1 }) //zwróci od najnowszych
        .limit(Number(req.params.x));

        let resultAll = [];
        for(let k = 0; k < tasks.length; k++) {
            let result = [];
            for (let i = 0; i < tasks[k].iloscWynikow; i++) {
                let object = {};
                object.MethodName = tasks[k].nazwaFunkcji;
                object.code = tasks[k].code.replace((/  |\r\n|\n|\r/gm),"") //usuwa wszystkie tabulacje i znaki nowej linii
                object.Parameters = [];
                for (let j = 0; j < tasks[k].iloscArg; j++) {
                    const paramObject = {};
                    paramObject.TypeName =
                        tasks[k].args[j * 2] === 'Typ prosty'
                            ? `System.${tasks[k].args[j * 2 + 1]}`
                            : `System.${tasks[k].args[j * 2 + 1]}[]`;
                    paramObject.Value =
                        tasks[k].args[j * 2] === 'Typ prosty'
                            ? `${tasks[k].wyniki[j]}`
                            : `[${tasks[k].wyniki[j]}]`;
                    object.Parameters.push(paramObject)
                }
                object.ResultTypeName =
                    tasks[k].returnArgs[k] === 'Typ prosty'
                        ? `System.${tasks[k].returnArgs[1]}`
                        : `System.${tasks[k].returnArgs[1]}[]`;

                object.ExpectedResult = 
                    tasks[k].returnArgs[k] === 'Typ prosty'
                        ? `${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}`
                        : `[${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}]`;
                object.CodeChecks = tasks[k].czyRekurencja ? ["RecursionCheck"] : []; 
                result.push(object);
            }
            resultAll.push(result)
        }

        return res.json(resultAll);
    }

    
});

// @route   GET api/tasks/
// @desc    Get all unread tasks
// @access  Public
router.get('/unread', async (req, res) => {
    let tasks = await Task.find({ czyPrzeczytano: false }).sort({ _id: -1 }); //zwróci od najnowszych
    let resultAll = [];
    for(let k = 0; k < tasks.length; k++) {
        let result = [];
        for (let i = 0; i < tasks[k].iloscWynikow; i++) {
            let object = {};
            object.MethodName = tasks[k].nazwaFunkcji;
            object.code = tasks[k].code.replace((/  |\r\n|\n|\r/gm),"") //usuwa wszystkie tabulacje i znaki nowej linii
            object.Parameters = [];
            for (let j = 0; j < tasks[k].iloscArg; j++) {
                const paramObject = {};
                paramObject.TypeName =
                    tasks[k].args[j * 2] === 'Typ prosty'
                        ? `System.${tasks[k].args[j * 2 + 1]}`
                        : `System.${tasks[k].args[j * 2 + 1]}[]`;
                paramObject.Value =
                    tasks[k].args[j * 2] === 'Typ prosty'
                        ? `${tasks[k].wyniki[j]}`
                        : `[${tasks[k].wyniki[j]}]`;
                object.Parameters.push(paramObject)
            }
            object.ResultTypeName =
                tasks[k].returnArgs[k] === 'Typ prosty'
                    ? `System.${tasks[k].returnArgs[1]}`
                    : `System.${tasks[k].returnArgs[1]}[]`;

            object.ExpectedResult = 
                tasks[k].returnArgs[k] === 'Typ prosty'
                    ? `${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}`
                    : `[${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}]`;
            object.CodeChecks = tasks[k].czyRekurencja ? ["RecursionCheck"] : []; 
            result.push(object);
        }
        resultAll.push(result)
    }

    await Task.updateMany(
        { czyPrzeczytano: false }, 
        { $set: { czyPrzeczytano: true } }
    ) 

    res.json(resultAll);
});

// @route   GET api/tasks/
// @desc    Get all tasks from x days
// @access  Public
router.get('/days/:x', async (req, res) => {
    const ile = parseInt(req.params.x)
    const date = new Date()
    const olderDate = new Date (date.setDate(date.getDate() - ile))

    if(!Number.isInteger(ile) || ile < 0){
        return res.status(400).send("Podałeś błędny parametr, to musi być liczba całkowita większa od 0");
    } else {
        let tasks = await Task.find({date: {$gte: olderDate } })
            .sort({ _id: -1 }) //zwróci od najnowszych
        
        let resultAll = [];
        for(let k = 0; k < tasks.length; k++) {
            let result = [];
            for (let i = 0; i < tasks[k].iloscWynikow; i++) {
                let object = {};
                object.MethodName = tasks[k].nazwaFunkcji;
                object.code = tasks[k].code.replace((/  |\r\n|\n|\r/gm),"") //usuwa wszystkie tabulacje i znaki nowej linii
                object.Parameters = [];
                for (let j = 0; j < tasks[k].iloscArg; j++) {
                    const paramObject = {};
                    paramObject.TypeName =
                        tasks[k].args[j * 2] === 'Typ prosty'
                            ? `System.${tasks[k].args[j * 2 + 1]}`
                            : `System.${tasks[k].args[j * 2 + 1]}[]`;
                    paramObject.Value =
                        tasks[k].args[j * 2] === 'Typ prosty'
                            ? `${tasks[k].wyniki[j]}`
                            : `[${tasks[k].wyniki[j]}]`;
                    object.Parameters.push(paramObject)
                }
                object.ResultTypeName =
                    tasks[k].returnArgs[k] === 'Typ prosty'
                        ? `System.${tasks[k].returnArgs[1]}`
                        : `System.${tasks[k].returnArgs[1]}[]`;

                object.ExpectedResult = 
                    tasks[k].returnArgs[k] === 'Typ prosty'
                        ? `${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}`
                        : `[${tasks[k].wyniki[(tasks[k].iloscArg + 1) * (i + 1) - 1]}]`;
                object.CodeChecks = tasks[k].czyRekurencja ? ["RecursionCheck"] : []; 
                result.push(object);
            }
            resultAll.push(result)
        }
            
            res.json(resultAll);
    }
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
