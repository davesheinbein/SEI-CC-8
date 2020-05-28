var Movie = require('../models/movie');
var Performer = require('../models/performer');

module.exports = {
  index,
  show,
  new: newMovie,
  create,
  update,
  deleteMovie
};

function index(req, res) {
  Movie.findById(req.params.id) 
  .populate('cast').exec(function(err, movie){
    Movie.find({}, function(err, movies) {
      res.render('movies/index', { title: 'All Movies', movies });
    });
  });
}

function show(req, res) {
  Movie.findById(req.params.id)
  .populate('cast').exec(function(err, movie) {
    Performer.find({}).where('_id').nin(movie.cast)
    Performer.find({_id: {$nin: movie.cast}})
    .exec(function(err, performers) {
      // console.log(performers);
      res.render('movies/show', {
        title: 'Movie Detail', movie, performers
      });
    });
  });
}

function newMovie(req, res) {
  res.render('movies/new', { title: 'Add Movie' });
}

function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowShowing = !!req.body.nowShowing;
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  var movie = new Movie(req.body);
  movie.save(function(err) {
    if (err) return res.redirect('/movies/new');
    // res.redirect('/movies');
    res.redirect(`/movies/${movie._id}`);
  });
}

function update(req, res){
  Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then((updateMovie) => {
      res.status(200).json({message: "Resource update", data: updateMovie})
  }).catch((err) => {
      res.status(404).json({message: "The resource was NOT successfully deleted"});
  })
}

function deleteMovie(req, res){
  console.log(req.params.id);
  Movie.deleteOne({_id: req.params.id})
  .then((result) => {
      res.status(200).json({message: "The resource was successfully deleted"});
  }).catch((err) => {
      res.status(404).json({message: "The resource was NOT successfully deleted"});
  })
}