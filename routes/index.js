var express = require('express');
var db = require('./dbman');
var router = express.Router();
// node bin/www
//const path = require('path')

/* GET home page. */
router.use('/', function(req, res, next) {
  if( true ) {
    res.json({result: 'auth failed'});
    return;
  }

  next();

})

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


module.exports = router;
