const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const verifyToken = require("../middleware/verifyToken");
const { getSentiment } = require("../utils/sentimentAnalyzer");
const axios = require("axios");

// POST /api/chat - Save message and return bot response
router.post("/", verifyToken, async (req, res) => {
  const { text } = req.body;
  const userId = req.user.userId;

  const sentiment = getSentiment(text);
  
  let responseText = `Hello! I see you're feeling ${sentiment}. How can I support you today?`;
  
  // Try OpenAI if API key exists
  if (process.env.OPENAI_API_KEY) {
    try {
      const gptResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are MoodMate, an empathetic mental health assistant." },
            { role: "user", content: text }
          ],
        },
        {
          headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
        }
      );
      responseText = gptResponse.data.choices[0].message.content;
    } catch (err) {
      console.error("OpenAI Error:", err.message);
    }
  }

  try {
    const message = new Message({
      userId,
      text,
      response: responseText,
      sentiment,
    });

    await message.save();
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/chat/history - Fetch history
router.get("/history", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user.userId }).sort({ timestamp: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

module.exports = router;
