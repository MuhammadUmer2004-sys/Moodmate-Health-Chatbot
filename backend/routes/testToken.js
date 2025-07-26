const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/protected", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // 🔍 Debug logs
  console.log("Token received:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ message: "Protected route accessed", userId: decoded.userId });
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
});

module.exports = router;
