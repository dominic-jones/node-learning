var mongoose = require('mongoose');

var raceDef = {
    type: String,
    enum: ['Terran', 'Protoss', 'Zerg']
};

var MatchSchema = new mongoose.Schema({
    playerRace: raceDef,
    opponentRace: raceDef,
    result: {
        type: String,
        enum: ['Win', 'Loss', 'Draw']
    }
});

mongoose.model('Match', MatchSchema);
