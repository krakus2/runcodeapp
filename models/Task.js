const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   tytulZadania: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 20
   },
   opisZadania: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 160,
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
