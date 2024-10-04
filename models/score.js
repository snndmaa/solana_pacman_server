const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    score: {
        type: Number,
        required: true,
    }
})

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
