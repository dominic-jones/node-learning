'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Match = mongoose.model('Match');

router.get('/api/init', function (req, res, next) {
    var initialData = [
        {playerRace: 'Protoss', opponentRace: 'Terran', result: 'Loss'},
        {playerRace: 'Protoss', opponentRace: 'Zerg', result: 'Loss'},
        {playerRace: 'Protoss', opponentRace: 'Protoss', result: 'Loss'},
        {playerRace: 'Protoss', opponentRace: 'Protoss', result: 'Win'},
        {playerRace: 'Protoss', opponentRace: 'Terran', result: 'Win'},
        {playerRace: 'Protoss', opponentRace: 'Zerg', result: 'Loss'},

        {playerRace: 'Terran', opponentRace: 'Protoss', result: 'Loss'},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win'},
        {playerRace: 'Terran', opponentRace: 'Protoss', result: 'Loss'},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win'},
        {playerRace: 'Terran', opponentRace: 'Terran', result: 'Loss'},
        {playerRace: 'Terran', opponentRace: 'Zerg', result: 'Win'},

        {playerRace: 'Zerg', opponentRace: 'Protoss', result: 'Win'},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Win'},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Loss'},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Loss'},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Win'},
        {playerRace: 'Zerg', opponentRace: 'Zerg', result: 'Win'},
        {playerRace: 'Zerg', opponentRace: 'Terran', result: 'Loss'}
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
