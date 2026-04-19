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

// Add a mood entry
router.post("/", verifyToken, async (req, res) => {
  try {
    const { moodType, note } = req.body;
    const sentiment = getSentiment(note || "");
    
    // Flag urgent if sentiment is negative and certain keywords are present
    const urgentKeywords = ["help", "kill", "die", "suicide", "end", "desperate", "hospital", "hurt"];
    const isUrgent = sentiment === "negative" && urgentKeywords.some(kw => note.toLowerCase().includes(kw));

    const mood = new Mood({
      userId: req.user.userId,
      moodType,
      note,
      isUrgent,
      sentimentScore: sentiment === "positive" ? 1 : sentiment === "negative" ? -1 : 0
    });

    await mood.save();
    res.status(201).json(mood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
