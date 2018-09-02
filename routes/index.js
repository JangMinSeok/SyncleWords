var express = require('express');
var db = require('./dbman');
var router = express.Router();
// node bin/www
//const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Login Page' });
});

router.post('/mainPage', function(req,res){
  console.log( 'index page -> mainPage' )
      // 로그인 처리
    db.login(req.body.id, req.body.pw, function(ret) {
    res.render('mainPage', { logined: true, results:ret } );
  })
});

router.post('/registerWord', function(req,res){
  console.log('mainPage recall')
  console.log( req.body.req_kor )
  console.log( req.body.req_jpn )
  db.registerWords( req.body.reg_kor, req.body.req_jpn, 1, function(ret) {
    console.log( 'db called' )
  })
});


module.exports = router;
