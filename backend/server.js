const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat");
const testTokenRoute = require("./routes/testToken");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend URL
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api", testTokenRoute);
app.use("/api/auth", authRoutes); // ✅ correct prefix

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
