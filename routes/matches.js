var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Match = mongoose.model('Match');

router.get('/api/matches', function (req, res) {
    Match.find(function (err, matches) {
        if (err) {
            return next(err);
        }

        res.json(matches);
    });
});

module.exports = router;
