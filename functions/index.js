/* eslint-disable indent */
/* eslint-disable quote-props */
/* eslint-disable quotes */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// eslint-disable-next-line no-unused-vars
const {onRequest} = require("firebase-functions/v2/https");
// eslint-disable-next-line no-unused-vars
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');

const axios = require('axios');
const app = express();
app.use(cors);

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
  const apiKey = functions.config().openai.key;
  console.log('API Key:', apiKey); // Log the retrieved API key
  const prompt = req.body.prompt;
  console.log('Prompt:', prompt); // Log the prompt

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
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      },
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
