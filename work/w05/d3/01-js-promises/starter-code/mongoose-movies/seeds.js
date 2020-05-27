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

// the results are not dependant on each other
Promise.all([p1, p2])
 .then(function(results){
     console.log(results);
    const creatPerformerPromise = Performer.create(data.performers)
    const createMoviePromise = Movie.create(data.movies) 

     // officially cleared out our db
     return Promise.all([creatPerformerPromise, createMoviePromise])
 })
 .then(function(results){
     console.log(results[0]);
     console.log(results[1]);
 })
 .then(function(){
     process.exit()
 }).catch(err => {
     console.log(err)
 })


Movie.deleteMany({}, (err, result) => {
    console.log(result)
    Performer.deleteMany({}, (err, res) => {
        console.log(res)
        Movie.create(data.movies, (err, movies)=> {
            console.log(movies)
            Performer.create(data.performers, (err, performers) => {

            })
        })
    })
})