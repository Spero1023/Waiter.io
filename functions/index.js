/* eslint-disable object-curly-spacing */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable quotes */
// eslint-disable-next-line no-unused-vars
const {onRequest} = require("firebase-functions/v2/https");
// eslint-disable-next-line no-unused-vars
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const axios = require('axios');
const app = express();
app.use(cors());

app.use(express.json());
// Initialize the Firebase Admin SDK
admin.initializeApp();

// Create an HTTP function to fetch API keys
app.get("/api/keys", async (req, res) => {
  try {
    // Retrieve the API keys from Firebase config
    const keys = functions.config().openai.key;

    return res.status(200).json(keys);
  } catch (error) {
    console.error("Error fetching API keys:", error);
    return res.status(500).json({error: "Failed to fetch API keys"});
  }
});

// Export the HTTP function
exports.fetchKeys = functions.https.onRequest(app);

app.post('/reformat-menu', async (req, res) => {
  console.log('Received request for reformat-menu');

  // Fetch API Key within the route
  let apiKey;
  try {
      apiKey = functions.config().openai.key;
  } catch (error) {
      console.error("API Key not configured:", error);
      return res.status(500).json({error: "API Key not configured"});
  }

  console.log('API Key:', apiKey);
  const prompt = req.body.prompt;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };
  console.log(headers);

  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }

    console.log('Sending request to OpenAI');
    const response = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-003/completions`,
      {
        prompt: prompt,
        max_tokens: 700,
        temperature: 0,
      },
      {headers: headers},
    );

    console.log('Received response from OpenAI:', response.data);
    const completion = response.data.choices[0].text;

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.error('Error:', error.message);
    return res.status(500).json({error: 'Failed to reformat'});
  }
});

// Export the HTTP function
exports.openai = functions.https.onRequest(app);
