const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/reformat-menu', async (req, res) => {
  const apiKey = functions.config().openai.key
  console.log(openaikey)
  const prompt = req.body.prompt;
  try {
    if (prompt == null) {
      throw new Error('Uh oh, no prompt was provided');
    }

    const response = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-003/completions`,
      {
        prompt: prompt,
        max_tokens: 700,
        temperature: 0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to reformat' });
  }
});
