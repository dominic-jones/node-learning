var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Match = mongoose.model('Match');

router.get('/api/init', function (req, res) {
    var initialData = [
        {playerRace: "Zerg", opponentRace: "Protoss", result: 'Win'},
        {playerRace: "Protoss", opponentRace: "Terran", result: 'Loss'},
        {playerRace: "Terran", opponentRace: "Protoss", result: 'Loss'},
        {playerRace: "Terran", opponentRace: "Protoss", result: 'Win'},
        {playerRace: "Zerg", opponentRace: "Terran", result: 'Win'},
        {playerRace: "Zerg", opponentRace: "Zerg", result: 'Loss'},
        {playerRace: "Protoss", opponentRace: "Zerg", result: 'Loss'}
    ];

    Match.remove({}, function (err) {
        console.log('collection removed')
    });

    Match.collection.insert(initialData, function (err) {
        if (err) {
            return next(err);
        }

        res.json({message: 'testing'});
    });
});

module.exports = router;
