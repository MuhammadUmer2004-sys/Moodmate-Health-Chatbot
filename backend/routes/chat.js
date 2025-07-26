const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Message = require("../models/Message"); // ✅ Correct model import

// Auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
}

// POST /chat/send - Save message and return bot response
router.post("/send", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const userId = req.userId;

  console.log("Incoming message:", text);

  // Basic sentiment analysis
  let sentiment = "neutral";
  const lower = text.toLowerCase();
  if (lower.includes("happy") || lower.includes("good")) sentiment = "positive";
  else if (lower.includes("bad") || lower.includes("sad")) sentiment = "negative";

  const botReply = `Hello! You said: "${text}"`;

  try {
    const newMessage = new Message({
      userId,
      text,
      response: botReply,
      sentiment,
    });

    await newMessage.save(); // ✅ Save to MongoDB

    res.json({
      response: botReply,
      sentiment: sentiment,
    });
  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// GET /chat/all - Fetch all messages for this user
router.get("/all", authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

module.exports = router;
