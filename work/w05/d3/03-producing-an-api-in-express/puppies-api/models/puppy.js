const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const puppySchema = new Schema({
  name: {type: String, required: true},
  breed: {type: String, default: 'Mixed'},
  age: {type: Number, default: 0}
},{
  timestamps: true
});

const Puppy = mongoose.model('Puppy', puppySchema)

// CRUD
