var express = require('express');
var router = express.Router();
// node bin/www
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

router.post('/mainPage', function(req,res){
  console.log(req.body.id)
  // �α��� ó��

  res.render('mainPage', {logined: true } );
});

module.exports = router;
