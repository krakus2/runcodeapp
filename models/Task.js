const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   tytulZadania: {
      type: String,
      required: true
   },
   opisZadania: {
      type: String,
      required: true
   },
   iloscArg: {
      type: Number,
      required: true
   },
   iloscWynikow: {
      type: Number,
      required: true
   },
   args: {
      type: [String],
      required: true
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
