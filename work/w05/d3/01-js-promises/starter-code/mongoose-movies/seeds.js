 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');

    //  Promises use case
//  1. SetInterval (create a promise)
//  2. SetTimeout(create a promise)
//  3. Model methods, (.then)
//  4 .request module anytype of api call (api calls) (.then)

    // use promises to "seed" our database
    // basically means put some started data in our database

    // Promises are another way of writing callback functions

    // Using promise.all instead
// const p1 = Movie.deleteMany({});
// const p2 = Performer.deleteMany({});
// // if we want promises to execute 
// // in parrell, 
// // the results are not dependant on each other
// Promise.all([p1, p2])
//  .then(function(results){
//      console.log(results);
//     const creatPerformerPromise = Performer.create(data.performers)
//     const createMoviePromise = Movie.create(data.movies) 
//      // officially cleared out our db
//      return Promise.all([creatPerformerPromise, createMoviePromise])
//  })
//  .then(function(results){
//      console.log(results[0]);
//      console.log(results[1]);
//  })
//  .then(function(){
//      process.exit()
//  }).catch(err => {
//      console.log(err)
//  })


    // clear out the movies and performers
const p1 = Movie.deleteMany({});
const p2 = Performer.deleteMany({});
    // if we want promises to execute in parrallel
    // the results are nt dependant on each other
Promise.all([p1, p2]) //clears both Movies and Performers DB
.then(function(results) {
    console.log(results);
    return Performer.create(data.performers) // adds to mongodb database
}).then(function(performers){
    console.log(performers);
    return Movie.create(data.movies) // adds to mongodb database
}).then(function(movies){
    console.log(movies)
}).then(function() {
    process.exit(); // to end our connection to mongodb 
}).catch(err => {
    console.log(err);
})

    // same as above
// Movie.deleteMany({}, (err, result) => {
//     console.log(result)
//     Performer.deleteMany({}, (err, res) => {
//         console.log(res)
//         Movie.create(data.movies, (err, movies)=> {
//             console.log(movies)
//             Performer.create(data.performers, (err, performers) => {
//             })
//         })
//     })
// })



    // Examples of how to clear the DB and how promises can be written
    // when seeding a db clear everything first
    // clear out the movies!
// Movie.deleteMany({}) // to clear out the Movie db
//     .then(function(result){
//         console.log(result)
//         process.exit(); // to end our connection to mongodb 
//     }).catch(function(err){
//         console.log(err);
//     });

    // does the same thing as above deleteMany but without a promise
// Movie.deleteMany({}, function(err, res) {
//     if(err){
//         console.log(err);
//     }
//     console.log(results);
//     process.exit()
// })




    // make a promise using the Promise class/constructor
// const p = new Promise(function(resolve, reject) {
//     setTimeout(function() {
//         // model finds something all the movies in the db
//         resolve(movies)
//         // model cant find all the movies, or something went wrong
//         reject('Something went wrong!');
//     }, 2000);
//   });
  
  

