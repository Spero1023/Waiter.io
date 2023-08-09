
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);

//post to openAI engine davinci-003 (chatgpt 3.5 turbo)
app.post('/api/reformat-menu', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    if (prompt == null) {
      throw new Error('Uh oh, no prompt was provided');
    }
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
    });
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
