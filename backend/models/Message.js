const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  text: { type: String, required: true },         // User message
  response: { type: String, required: true },     // Bot response
  sentiment: { type: String, default: "neutral" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
