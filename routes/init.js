'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Match = mongoose.model('Match');

router.get('/api/init', function (req, res, next) {
    console.log();
    var initialData = [
        {playerRace: 'Protoss', opponentRace: 'Terran', result: 'Loss', date: Date.UTC(2015, 11, 11, 12, 40, 15, 45)},
        {playerRace: 'Protoss', opponentRace: 'Zerg', result: 'Loss', date: Date.UTC(2015, 11, 1, 12, 13, 15, 45)},
        {playerRace: 'Protoss', opponentRace: 'Protoss', result: 'Loss', date: Date.UTC(2015, 8, 13, 12, 13, 15, 45)},
        {playerRace: 'Protoss', opponentRace: 'Protoss', result: 'Win', date: Date.UTC(2015, 8, 12, 14, 13, 15, 45)},
        {playerRace: 'Protoss', opponentRace: 'Terran', result: 'Win', date: Date.UTC(2015, 8, 12, 15, 13, 15, 45)},
        {playerRace: 'Protoss', opponentRace: 'Zerg', result: 'Loss', date: Date.UTC(2015, 10, 24, 16, 13, 15, 45)},

        {playerRace: 'Terran', opponentRace: 'Protoss', result: 'Loss', date: Date.UTC(2015, 11, 5, 13, 34, 15, 45)},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win', date: Date.UTC(2015, 11, 5, 14, 13, 57, 45)},
        {playerRace: 'Terran', opponentRace: 'Protoss', result: 'Loss', date: Date.UTC(2015, 11, 5, 15, 56, 15, 45)},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win', date: Date.UTC(2015, 11, 5, 16, 13, 45, 45)},
        {playerRace: 'Terran', opponentRace: 'Terran', result: 'Loss', date: Date.UTC(2015, 11, 5, 17, 34, 15, 45)},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win', date: Date.UTC(2015, 11, 5, 15, 24, 15, 45)},

        {playerRace: 'Zerg', opponentRace: 'Protoss', result: 'Win', date: Date.UTC(2015, 11, 4, 1, 13, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Win', date: Date.UTC(2015, 10, 5, 1, 13, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Loss', date: Date.UTC(2015, 11, 5, 2, 5, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Loss', date: Date.UTC(2015, 11, 5, 2, 13, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Win', date: Date.UTC(2015, 11, 5, 2, 25, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Win', date: Date.UTC(2015, 10, 5, 3, 35, 15, 45)},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Loss', date: Date.UTC(2015, 11, 5, 3, 45, 15, 45)}
    ];

    Match.remove({}, function (err) {
        if (err) {
            return next(err);
        }

        console.log('collection removed');
    });

    //I am aware this is slow as it calls through save() on each entity, but at this stage of the app I
    //want the validation
    Match.create(initialData)
        .then(
        function onInit() {
            res.json({message: 'testing'});
        },
        function onInitError(err) {
            return next(err);
        }
    );
});

module.exports = router;
