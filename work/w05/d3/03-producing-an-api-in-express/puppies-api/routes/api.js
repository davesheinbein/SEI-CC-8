var express = require('express');
var router = express.Router();
const puppiesCtrl = require('../controllers/api/puppies');
/* GET users listing. */
router.get('/puppies', puppiesCtrl.index);// read
router.post('/puppies', puppiesCtrl.create); // create
router.delete('/puppies/:id', puppiesCtrl.deletePuppy); //deleteOne
router.put('/puppies/:id', puppiesCtrl.update); // findByIdAndUpdate

module.exports = router;
