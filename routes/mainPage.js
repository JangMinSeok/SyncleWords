/**
 * Created by Genesis on 2018-08-06.
 */

var express = require('express');
var db = require('./dbman');
var router = express.Router();

//router.post('/registerWord', function(req,res){
//    console.log('mainPage recall')
//    // 로그인 처리
//    //db.login(req.body.id, req.body.pw, function(ret) {
//    //res.render('registerWord' );
//    //})
//});

//var mysql      = require('mysql');
//var connection = mysql.createConnection({
//    host     : 'localhost',
//    user     : 'root',
//    password : 'realslow41#&',
//    port     : 3306,
//    database : 'synclewords'
//});
//
//connection.connect();
//
//connection.query('SELECT * from WordsList', function(err, rows, fields) {
//    if (!err)
//        console.log('The solution is: ', rows);
//    else
//        console.log('Error while performing Query.', err);
//});

/* GET home page. */
//router.get('/', function(req, res) {
//    res.render('mainPage', { logined: 'Main Page' });
//});

module.exports = router;