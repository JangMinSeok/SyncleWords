var express = require('express');
var db = require('./dbman');
var router = express.Router();
// node bin/www
//const path = require('path')


//////////////////////////////////////////////////////
router.get('/getajax', function(req, res, next) {
  console.log('getajax method call');
  res.render("/");
});

/* POST ȣ�� ó�� */
router.post('/LoginAccept', function(req, res, next) {
  console.log('POST ajaxTest method call');
  //view�� �ִ� data ���� ���� ���� �޾Ƽ�
  var userID = req.body.id;
  var userPW = req.body.password;
  var submitType = 1;
  console.log( userID );
  console.log( userPW );
  console.log( submitType );
  //json �������� ���� �ش�.
  //res.send({result:true });
  //db.getWordsGroup( userID, function(ret) {
  //  console.log('db called')
  //  console.log(ret)
  //  res.render('mainPage', { MenuType: submitType, Groups: ret, UserID:userID });
  //})
});


////////////////////////////////////////////////////

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
      // �α��� ó��
    //db.login(req.body.id, req.body.pw, function(ret) {
    var submitType = req.body.SubmitType;
    var userID = req.body.LoginUserID;
    console.log( submitType )
  // �ܾ� ���
  if ( submitType == 1) {
    db.getWordsGroup( userID, function(ret) {
      console.log('db called')
      console.log(ret)
      res.render('mainPage', {MenuType: submitType, Groups: ret, UserID:userID});
    })
  }
  // �׷캰 ����
  if ( submitType == 2 ) {
    db.viewGroups( userID, function(ret) {
      console.log( 'db called' )
      console.log( ret )
      res.render('mainPage', { MenuType: submitType, Views:ret, UserID:userID } );
    })
    //db.viewWords( userID, function(ret) {
    //  console.log( 'db called' )
    //  console.log( ret )
    //  res.render('mainPage', { MenuType: submitType, Views:ret, UserID:userID } );
    //})
  }
  // �ܾ� �˻�
  if ( submitType == 3 ) {
      console.log( 'search Word' )
      res.render('mainPage', { MenuType: submitType, UserID:userID } );
  }
  // �׷� ����
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

router.post('/viewGroupWords', function(req,res) {
  var groupSN = req.body.view_group;
  var userID = req.body.view_userID;
  console.log( groupSN );
  console.log( userID );
  db.viewGroups( userID, function(ret) {
    db.viewGroupWords( groupSN, userID, function(ret2) {
      console.log( 'viewGroupWords called' );
      console.log( ret2 );
      res.render('mainPage', { MenuType: 6, GroupRes:ret, WordsRes:ret2, UserID:userID } );
    })
  })
})

module.exports = router;
