const mongoose = require("mongoose");

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moodType: { 
    type: String, 
    required: true,
    enum: ["happy", "sad", "neutral", "unstable", "anxious", "excited", "angry"]
  },
  note: { type: String },
  sentimentScore: { type: Number }, // From sentiment analysis
  isUrgent: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Mood", MoodSchema);
