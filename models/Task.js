const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    imieINazwisko: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 60,
        trim: true
    },
    tytulZadania: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20,
        trim: true
    },
    opisZadania: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 160,
        trim: true
    },
    nazwaFunkcji: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40,
        trim: true
    },
    iloscArg: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    iloscWynikow: {
        type: Number,
        required: true,
        min: 1
    },
    args: {
        type: Array
    },
    returnArgs: {
        type: [String],
        required: true
    },
    wyniki: {
        type: [String],
        required: true
    },
    czyRekurencja: {
        type: Boolean,
        required: true
    }
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;
