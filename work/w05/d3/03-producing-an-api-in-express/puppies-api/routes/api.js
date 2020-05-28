var express = require('express');
var router = express.Router();
const puppiesCtrl = require('../controllers/api/puppies')

/* GET users listing. */
router.get('/puppies', puppiesCtrl.index) // connects to controller
router.post('/puppies', puppiesCtrl.create) // connects to controller
router.delete('/puppies/:id', puppiesCtrl.deletePuppy) // connects to controller
router.put('/puppies/:id', puppiesCtrl.update) // connects to controller


module.exports = router;
