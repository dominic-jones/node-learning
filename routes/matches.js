var express = require('express');
var router = express.Router();

router.get('/api/matches', function (req, res) {
    res.json({"matches": ["Match Alpha", "Match Beta"]});
});

module.exports = router;