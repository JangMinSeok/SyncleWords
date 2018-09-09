var express = require('express');
var db = require('./dbman');
var router = express.Router();
// node bin/www
//const path = require('path')

/* GET home page. */
router.use('/', function(req, res, next) {
  if( false ) {
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
    //db.login(req.body.id, req.body.pw, function(ret) {
    var submitType = req.body.SubmitType;
    console.log( submitType )
  if ( submitType == 1) {
    res.render('mainPage', { MenuType: submitType, Views:0 } );
  }
  if ( submitType == 2 ) {
    db.viewWords( function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: 2, Views:ret } );
    })
  }
  if ( submitType == 3 ) {
      console.log( 'search Word' )
      res.render('mainPage', { MenuType: 3 } );
  }
  //})
});

router.post('/registerWord', function(req,res){
  console.log('registerWord called')
  var kor = req.body.reg_kor;
  var jpn = req.body.reg_jpn;
  console.log( kor )
  console.log( jpn )
  db.registerWord( kor, jpn, 1, 1, function(ret) {
    console.log( 'db called' )
    console.log( ret )
    res.render('mainPage', { MenuType: 1 } );
  })
});

router.post('/searchWord', function(req,res) {
  console.log('searchWord called');
  var search = req.body.searchWord;
  console.log( search );
  db.searchWords( search, function(ret) {
    console.log( 'db called' );
    console.log( ret );
    res.render('mainPage', { MenuType: 4, SearchRes:ret } );
  })
})

module.exports = router;
