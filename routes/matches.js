'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var _ = require('underscore');
var Match = mongoose.model('Match');

function isWin(match) {
    return 'Win' === match.result;
}

function isLoss(match) {
    return 'Loss' === match.result;
}

function playerRace(match) {
    return match.playerRace;
}

function opponentRace(match) {
    return match.opponentRace;
}

function toStatistics(matches) {

    var wins = matches.filter(isWin).length;
    var losses = matches.filter(isLoss).length;
    var ratio = (wins / matches.length * 100).toFixed(2);
    var lossesAgainstRace = _.chain(matches)
        .filter(isLoss)
        .countBy(opponentRace);

    return {
        wins: wins,
        losses: losses,
        ratio: ratio,
        lossesAgainstRace: lossesAgainstRace
    }
}

router.get('/api/matches', function (req, res) {
    Match.find(function (err, matches) {
        if (err) {
            return next(err);
        }

        var byRace = _.chain(matches)
            .groupBy(playerRace)
            .mapObject(toStatistics)
            .value();

        byRace['Overall'] = toStatistics(matches);

        res.json({
            matches: matches,
            byRace: byRace
        });
    });
});

module.exports = router;
