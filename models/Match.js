var mongoose = require('mongoose');

var MatchSchema = new mongoose.Schema({
    playerRace: String,
    opponentRace: String,
    result: String
});

mongoose.model('Match', MatchSchema);
