 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');


// use promises to "seed" our database
// which basically means put some starter data
// in our database

// CLear out everything first


const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});

// if we want promises to execute
// in parrell,
