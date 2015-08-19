'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var _ = require('underscore');
var Match = mongoose.model('Match');

var Q = require('q');

function isWin(match) {
    return 'Win' === match.result;
}

function isLoss(match) {
    return 'Loss' === match.result;
}

function opponentRace(match) {
    return match.opponentRace;
}

function toStatistics(matchData) {

    var matches = matchData.matches;
    var wins = matches.filter(isWin).length;
    var losses = matches.filter(isLoss).length;
    var ratio = (wins / matches.length * 100).toFixed(2);
    var lossesAgainstRace = _.chain(matches)
        .filter(isLoss)
        .countBy(opponentRace)
        .value();

    return {
        race: matchData.race,
        wins: wins,
        losses: losses,
        ratio: ratio,
        lossesAgainstRace: lossesAgainstRace,
        matches: matches
    };
}

function withRace(race, matches) {
    return {
        race: race,
        matches: matches
    };
}

function findRace(limit, race) {
    return Match.find({playerRace: race})
        .sort([['date', 'descending']])
        .limit(limit)
        .then(withRace.bind(null, race));
}

router.get('/api/matches', function (req, res, next) {
    var limit = 5;
    Q.all([
        Match.find()
            .sort([['date', 'descending']])
            .limit(limit)
            .then(withRace.bind(null, 'Overall')),
        findRace('Protoss', limit),
        findRace('Terran', limit),
        findRace('Zerg', limit)
    ])
        .then(function mapToStatistics(raceHistory) {
            return raceHistory.map(toStatistics);
        })
        .then(function withRaceData(raceData) {
            return {
                raceData: raceData
            }
        })
        .then(res.json.bind(res))
        .catch(function onError(err) {
            return next(err);
        })
        .done()
    ;
});

module.exports = router;
