const natural = require("natural");
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
exports.getSentiment = (text) => {
  const score = analyzer.getSentiment(text.split(" "));
  if (score > 0) return "positive";
  if (score < 0) return "negative";
  return "neutral";
};