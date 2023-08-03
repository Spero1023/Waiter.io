const axios = require('axios');
const express = require('express');
const router = require('express').Router()
require('dotenv').config();
module.exports = router

//body-parsing middleware
router.use(express.json()); 

//post to openAI engine davinci-003 (chatgpt 3.5 turbo)
router.post('/api/reformat-menu', async(req, res) =>{
  const openaiApiKey = process.env.API_KEY_OPENAPI;

    const prompt = req.body.prompt;

    try {
        const openaiResponse = await axios.post('https://api.openai.com/v1/engines/davinci-003/completions', {
        //prompt goes here
        prompt: prompt,
          max_tokens: 150
        }, {
            //need to insert openapi key into bearer
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiApiKey}`
          }
        });
        const reformattedMenu = openaiResponse.data.choices[0].text;
        res.json({ reformattedMenu });
}catch(error){
    console.error('Error calling OpenAPI', error);
    res.status(500).json({ error: "Failed to reformat"})
}
});