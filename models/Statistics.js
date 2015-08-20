'use strict';

var mongoose = require('mongoose');

var raceDef = {
    type: String,
    enum: ['Terran', 'Protoss', 'Zerg']
};

var StatisticsSchema = new mongoose.Schema({
    playerRace: raceDef,
    opponentRace: raceDef,
    result: {
        type: String,
        enum: ['Win', 'Loss', 'Draw']
    },
    date: Date
});

mongoose.model('Statistics', StatisticsSchema);
