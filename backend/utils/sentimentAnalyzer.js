const natural = require("natural");
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
const tokenizer = new natural.WordTokenizer();

exports.getSentiment = (text) => {
  if (!text) return { score: 0, category: 'neutral', isUrgent: false };

  try {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const score = analyzer.getSentiment(tokens) || 0;
    
    // Custom keyword detection for better precision
    const anxiousKeywords = ['anxious', 'worried', 'scared', 'nervous', 'panic', 'stress', 'stressed', 'fear'];
    const sadKeywords = ['sad', 'depressed', 'lonely', 'unhappy', 'crying', 'heartbroken', 'hopeless'];
    const urgentKeywords = ['suicide', 'hurt', 'kill', 'end it', 'die', 'emergency', 'harm'];

    let category = 'neutral';
    let isUrgent = false;
    
    if (tokens.some(t => urgentKeywords.includes(t))) {
      category = 'urgent';
      isUrgent = true;
    } else if (tokens.some(t => anxiousKeywords.includes(t))) {
      category = 'anxious';
    } else if (tokens.some(t => sadKeywords.includes(t)) || score < -0.3) {
      category = 'sad';
    } else if (score > 0.3) {
      category = 'happy';
    }

    return { score, category, isUrgent };
  } catch (err) {
    return { score: 0, category: 'neutral', isUrgent: false };
  }
};