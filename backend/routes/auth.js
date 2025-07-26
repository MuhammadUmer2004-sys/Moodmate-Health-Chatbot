const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const demoUser = {
  username: "testuser",
  password: "testpass",
  _id: "demo123",
};

router.post("/login", (req, res) => {
  console.log("Login endpoint hit");
  console.log("JWT_SECRET from env:", process.env.JWT_SECRET);

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (username === demoUser.username && password === demoUser.password) {
    const token = jwt.sign({ userId: demoUser._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
