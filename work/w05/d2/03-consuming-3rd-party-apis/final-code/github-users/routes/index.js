var express = require('express');
var router = express.Router();
const githubCtrl = require('../controllers/github');

/* GET home page. */
router.get('/', githubCtrl.userDetails);

module.exports = router;
