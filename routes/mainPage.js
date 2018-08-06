/**
 * Created by Genesis on 2018-08-06.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('mainPage', { title: 'Main Page' });
});

module.exports = router;