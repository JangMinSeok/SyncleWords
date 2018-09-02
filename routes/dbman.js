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

DBMan.prototype.registerWords = function( kor, jpn, group_sn, cb ) {
    var sQuery = 'CALL RegisterWord( '
    sQuery = sQuery + '"' + jpn + '"' + ',' + '"' + kor + '"' + ',' + group_sn + ')'
    console.log(sQuery)
    this.connection.query( sQuery )
}

var man = new DBMan();

module.exports = man;