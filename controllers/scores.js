const Score = require('../models/score');
const User = require('../models/user');

const ScoresController = {
  Index: async (req, res) => {
    try {
      const scores = await Score.find()
      .populate('user', 'username')
      .sort({ score: -1 });
      if (!scores) {
          return res.status(404).json({ message: "No scores found for this user" });
      }

      res.status(200).json(scores);
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
  },
  Create: async (req, res) => {
    try {
      const { userName, score } = req.body;

      const user = await User.findOne({ userName });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Create a new score
      const newScore = new Score({
          user: user._id,
          score,
      });

      await newScore.save();

      // Check if this is a new high score
      if (score > user.highScore) {
          user.highScore = score;
          await user.save(); // Update the user's highScore
      }

      res.status(201).json({ message: "Score created", score: newScore });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

module.exports = ScoresController;
