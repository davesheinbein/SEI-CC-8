 require('./config/database');// connect this script to the database
 const Movie = require('./models/movie');
 const Performer = require('./models/performer');
 const data = require('./data');


 // Movie.deleteMany({})
 // .then(function(results) {
 //   console.log(results);
 //   process.exit(); // what does this line do?
 
 // when seeding first clear out everything

 const p1 = Movie.deleteMany({});
 const p2 = Performer.deleteMany({});

console.log("=============================")
console.log(p1)

console.log("=============================")


 Promise.all([p1, p2])
 .then(function(results) {
   console.log(results); // an array with the promise results

   return Performer.create(data.performers)
 })
 .then((performers) => {
 	console.log(performers, ' this is performers')

 	return Movie.create(data.movies)
 })
 .then((movies) => {
 	console.log('movies', movies)
 })
 .then(function() {
   process.exit();
 }).catch((err) =>{
 	console.log(err)
 })

console.log("=============================")
console.log(p1)

console.log("=============================")

