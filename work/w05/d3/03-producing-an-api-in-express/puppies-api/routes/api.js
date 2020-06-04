var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const puppiesCtrl = require('../controllers/api/puppies')

/* GET users listing. */
router.get('/puppies', puppiesCtrl.index) // connects to controller
router.post('/puppies', puppiesCtrl.create) // connects to controller
router.delete('/puppies/:id', puppiesCtrl.deletePuppy) // connects to controller
router.put('/puppies/:id', puppiesCtrl.update) // connects to controller

=======
const puppiesCtrl = require('../controllers/api/puppies');
/* GET users listing. */
router.get('/puppies', puppiesCtrl.index);// read
router.post('/puppies', puppiesCtrl.create); // create
router.delete('/puppies/:id', puppiesCtrl.deletePuppy); //deleteOne
router.put('/puppies/:id', puppiesCtrl.update); // findByIdAndUpdate
>>>>>>> 5f2edb806a256b34576dab788496bce58785bca4

module.exports = router;
