const mongoose = require('mongoose');
<<<<<<< HEAD
mongoose.connect(
  'mongodb://localhost:27017/puppies',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}
);
const db = mongoose.connection;
=======

mongoose.connect(
  'mongodb://localhost:27017/puppies',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false  }
);

const db = mongoose.connection;

>>>>>>> 5f2edb806a256b34576dab788496bce58785bca4
db.on('connected', function() {
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});