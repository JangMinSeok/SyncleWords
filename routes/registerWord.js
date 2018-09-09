/**
 * Created by Genesis on 2018-09-02.
 */

var express = require('express');
var db = require('./dbman');
var router = express.Router();

//router.post('/', function(req,res){
//    console.log('mainPage recall')
//    console.log( req.body.req_kor )
//    console.log( req.body.req_jpn )
//    db.registerWord( req.body.reg_kor, req.body.req_jpn, 1, function(ret) {
//        console.log( 'db called' )
//        res.render('mainPage', { logined: true } );
//        //redirect
//    })
//});


module.exports = router;