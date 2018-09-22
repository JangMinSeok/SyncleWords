/**
 * Created by genesis on 2018-08-17.
 */
var mysql      = require('mysql');

var DBMan = function() {
    this.connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'realslow41#&',
        port     : 3306,
        database : 'synclewords'
});
this. connection.connect();
}

DBMan.prototype.login = function(id,pw, cb) {
    this.connection.query('SELECT * from WordsList', function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    });
}

DBMan.prototype.registerWord = function( kor, jpn, userID, group_sn, cb ) {
    var sQuery = 'CALL RegisterWord( '
    sQuery = sQuery + '"' + jpn + '"' + ',' + '"' + kor + '"' + ',' + userID + ',' + group_sn + ')'
    console.log(sQuery)
    this.connection.query( sQuery )
    cb(0)
}

DBMan.prototype.viewWords = function( userID, cb) {
    var sQuery = "SELECT * FROM WordsList WHERE UserID =" + userID;
        this.connection.query( sQuery, function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    });
}

DBMan.prototype.searchWords = function( userID, searchWord, cb ) {
    //var sQuery = "SELECT * FROM WordsList WHERE UserID =" + userID + " AND JPN LIKE '%" + searchWord + "%" + "' OR KOR LIKE '" + "%" + searchWord + "%'"
    var sQuery = "SELECT * FROM WordsList AS A JOIN WordsGroup AS B ON A.GroupSN = B.GroupSN WHERE A.UserID =" + userID + " AND JPN LIKE '%"  + searchWord + "%" + "' OR KOR LIKE '" + "%" + searchWord + "%'"
    console.log( sQuery )
    this.connection.query(sQuery, function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    });
}

DBMan.prototype.getWordsGroup = function( userID, cb ) {
    var sQuery = "SELECT * FROM WordsGroup WHERE UserID = " + userID;
    console.log( sQuery )
    this.connection.query(sQuery, function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    });
}

DBMan.prototype.viewGroups = function( userID, cb) {
    var sQuery = "SELECT * FROM WordsGroup WHERE UserID =" + userID;
    this.connection.query( sQuery, function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    });
}

DBMan.prototype.registerGroup = function( GroupName, userID, cb ) {
    var sQuery = 'CALL RegisterGroup( '
    sQuery = sQuery + '"' + GroupName + '"' + ',' + userID + ')'
    console.log(sQuery)
    this.connection.query( sQuery )
    cb(0)
}

DBMan.prototype.deleteGroup = function( GroupSN, userID, cb ) {
    var sQuery = 'CALL DeleteGroup( '
    sQuery = sQuery + GroupSN + ',' + userID + ')'
    console.log(sQuery)
    this.connection.query( sQuery )
    cb(0)
}

DBMan.prototype.viewGroupWords = function( GroupSN, userID, cb ) {
    var sQuery = "SELECT * FROM WordsList WHERE UserID =" + userID + " AND GroupSN = " + GroupSN

    console.log(sQuery)
    this.connection.query( sQuery, function(err, rows, fields) {
        if (!err) {
            cb(rows)
        }
        else
            cb(-1)
    })
}

var man = new DBMan();

module.exports = man;