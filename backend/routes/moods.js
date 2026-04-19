const express = require("express");
const Mood = require("../models/Mood");
const verifyToken = require("../middleware/verifyToken");
const { getSentiment } = require("../utils/sentimentAnalyzer");
const router = express.Router();

// Get user moods
router.get("/", verifyToken, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.userId }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a mood entry (with AI Autodetection)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { note } = req.body;
    
    // AI Detects everything from the note!
    const { score, category, isUrgent } = getSentiment(note || "");

    const mood = new Mood({
      userId: req.user.userId,
      moodType: category, // Auto-detected category
      note,
      isUrgent,
      sentimentScore: score
    });

    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
