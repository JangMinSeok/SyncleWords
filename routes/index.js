var express = require('express');
var router = express.Router();
// node bin/www
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

module.exports = router;
