const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat");
const authRoutes = require("./routes/auth");
const moodRoutes = require("./routes/moods");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"], 
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });
