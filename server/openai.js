const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/generate-response', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const userMessage = req.body.message;

    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt: userMessage,
        max_tokens: 700,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedResponse = response.data.choices[0].text;
    res.json({ response: generatedResponse });
  } catch (error) {
    console.error('Error generating response:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while generating the response.' });
  }
});

module.exports = router;
