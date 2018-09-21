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
    var userID = req.body.LoginUserID;
    console.log( submitType )
  // 단어 등록
  if ( submitType == 1) {
    db.getWordsGroup( userID, function(ret) {
      console.log('db called')
      console.log(ret)
      res.render('mainPage', {MenuType: submitType, Groups: ret, UserID:userID});
    })
  }
  // 단어 보기
  if ( submitType == 2 ) {
    db.viewWords( userID, function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: submitType, Views:ret, UserID:userID } );
    })
  }
  // 단어 검색
  if ( submitType == 3 ) {
      console.log( 'search Word' )
      res.render('mainPage', { MenuType: submitType, UserID:userID } );
  }
  // 그룹 수정
  if ( submitType == 5 ) {
    console.log( 'Modify Group' )
    db.viewGroups( userID, function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: submitType, Views:ret, UserID:userID } );
    })
  }
  //})
});

router.post('/registerWord', function(req,res){
  console.log('registerWord called')
  var kor = req.body.reg_kor;
  var jpn = req.body.reg_jpn;
  var groupSN = req.body.reg_group;
  var userID = req.body.reg_userID;
  console.log( kor )
  console.log( jpn )
  console.log( groupSN )
  console.log( userID )
  db.registerWord( kor, jpn, userID, groupSN, function(ret) {
    console.log( 'db called' )
    console.log( ret )
    db.getWordsGroup( userID, function(ret) {
      console.log('db called')
      console.log(ret)
      res.render('mainPage', {MenuType: 1, Groups: ret, UserID:userID });
    })
  })
});

router.post('/searchWord', function(req,res) {
  console.log('searchWord called');
  var search = req.body.searchWord;
  var userID = req.body.search_userID;
  console.log( search );
  console.log( userID );
  db.searchWords( userID, search, function(ret) {
    console.log( 'db called' );
    console.log( ret );
    res.render('mainPage', { MenuType: 4, SearchRes:ret, UserID:userID } );
  })
})

router.post('/registerGroup', function(req,res) {
  console.log('registerGroup called');
  var regGroupName = req.body.reg_group;
  var userID = req.body.group_userID;
  console.log( regGroupName );
  console.log( userID );
  db.registerGroup( regGroupName, userID, function(ret) {
    console.log( 'db called' );
    console.log( ret );
    db.viewGroups( userID, function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: 5, Views:ret, UserID:userID } );
    })
  })
})

router.post('/deleteGroup', function(req,res) {
  console.log('deleteGroup called');
  var delGroupSN = req.body.delete_group;
  var userID = req.body.group_userID;
  console.log( delGroupSN );
  console.log( userID );
  db.deleteGroup( delGroupSN, userID, function(ret) {
    console.log( 'db called' );
    console.log( ret );
    db.viewGroups( userID, function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: 5, Views:ret, UserID:userID } );
    })
  })
})

module.exports = router;
