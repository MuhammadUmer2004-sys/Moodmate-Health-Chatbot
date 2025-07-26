const Message = require("../models/Message");
const { getSentiment } = require("../utils/sentimentAnalyzer");
const axios = require("axios");

exports.handleMessage = async (req, res) => {
  const { text } = req.body;
  const sentiment = getSentiment(text);
  const gptResponse = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    }
  );

  const response = gptResponse.data.choices[0].message.content;
  const message = await Message.create({ text, response, sentiment });
  res.json(message);
};