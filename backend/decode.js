const jwt = require("jsonwebtoken");

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MTIzIiwiaWF0IjoxNzUzNDYxMzI0LCJleHAiOjE3NTM0NjQ5MjR9.gStr0u9i4n4NyDwVdysKPrmB-y3tCfsWLbzmiKfugwc";

const secret = process.env.JWT_SECRET || "your_secret_here"; // Replace if needed

try {
  const decoded = jwt.verify(token, secret);
  console.log("✅ Token is valid:", decoded);
} catch (err) {
  console.error("❌ Token error:", err.message);
}
