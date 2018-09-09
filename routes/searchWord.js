
var express = require('express');
var db = require('./dbman');
var router = express.Router();


router.post('/searchWord', function(req,res) {
    console.log('searchWord called')
    //var search = req.body.searchWord;
    //console.log( search )
})

module.exports = router;