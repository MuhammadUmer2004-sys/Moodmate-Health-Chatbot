const natural = require("natural");
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");

exports.getSentiment = (text) => {
  if (!text) return "neutral";
  
  // Clean text
  const cleanText = text.replace(/[^\w\s]/gi, '').toLowerCase();
  const tokenized = cleanText.split(/\s+/);
  
  try {
    const score = analyzer.getSentiment(tokenized);
    if (score > 0.2) return "positive";
    if (score < -0.2) return "negative";
    return "neutral";
  } catch (err) {
    return "neutral";
  }
};