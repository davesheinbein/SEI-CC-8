const mongoose = require('mongoose');
const Schema = mongoose.Schema;
<<<<<<< HEAD
=======

>>>>>>> 5f2edb806a256b34576dab788496bce58785bca4
const puppySchema = new Schema({
  name: {type: String, required: true},
  breed: {type: String, default: 'Mixed'},
  age: {type: Number, default: 0}
},{
  timestamps: true
});
<<<<<<< HEAD
module.exports = mongoose.model('Puppy', puppySchema);
=======

const Puppy = mongoose.model('Puppy', puppySchema)

// CRUD
>>>>>>> 5f2edb806a256b34576dab788496bce58785bca4
