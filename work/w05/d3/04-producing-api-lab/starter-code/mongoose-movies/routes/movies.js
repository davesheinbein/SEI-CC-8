var express = require('express');
var router = express.Router();
var moviesCtrl = require('../controllers/movies');

router.get('/', moviesCtrl.index);
router.get('/new', moviesCtrl.new);
router.get('/:id', moviesCtrl.show);
router.post('/', moviesCtrl.create);

router.put('/:id', moviesCtrl.update); // New

router.delete('/:id', moviesCtrl.deleteMovie) // connects to controller

module.exports = router;
