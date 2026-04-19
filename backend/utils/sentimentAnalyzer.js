const natural = require("natural");
const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
const tokenizer = new natural.WordTokenizer();

exports.getSentiment = (text) => {
  if (!text) return { score: 0, category: 'neutral', isUrgent: false };

  try {
    const tokens = tokenizer.tokenize(text.toLowerCase());
    const score = analyzer.getSentiment(tokens) || 0;
    
    // Custom keyword detection for targeted emotions
    const anxietyKeywords = ['anxious', 'anxiety', 'worried', 'scared', 'nervous', 'panic', 'stress', 'stressed', 'fear', 'overwhelmed'];
    const sadKeywords = ['sad', 'depressed', 'lonely', 'unhappy', 'crying', 'heartbroken', 'hopeless', 'down', 'miserable'];
    const angerKeywords = ['anger', 'angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'rage', 'irritated'];
    const excitementKeywords = ['excitement', 'excited', 'thrilled', 'amazing', 'awesome', 'pumped', 'ecstatic', 'stoked', 'fantastic'];
    const happyKeywords = ['happy', 'joy', 'good', 'great', 'content', 'glad', 'peaceful'];
    const urgentKeywords = ['suicide', 'hurt', 'kill', 'end it', 'die', 'emergency', 'harm', 'give up'];

    let category = 'neutral';
    let isUrgent = false;
    
    // Priority order: Urgent -> Emotion Keywords -> General Score fallback
    if (tokens.some(t => urgentKeywords.includes(t))) {
      category = 'urgent';
      isUrgent = true;
    } else if (tokens.some(t => angerKeywords.includes(t))) {
      category = 'anger';
    } else if (tokens.some(t => anxietyKeywords.includes(t))) {
      category = 'anxiety';
    } else if (tokens.some(t => excitementKeywords.includes(t))) {
      category = 'excitement';
    } else if (tokens.some(t => sadKeywords.includes(t)) || score <= -0.4) {
      category = 'sad';
    } else if (tokens.some(t => happyKeywords.includes(t)) || score > 0.4) {
      category = 'happy';
    }

    return { score, category, isUrgent };
  } catch (err) {
    return { score: 0, category: 'neutral', isUrgent: false };
  }
};