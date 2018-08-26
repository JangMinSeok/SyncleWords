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
            console.log(rows)
            cb(rows)
        }
        else
            cb(-1)
    });
}

var man = new DBMan();

module.exports = man;