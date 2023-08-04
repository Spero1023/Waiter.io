import { Configuration, OpenAIApi } from 'openai';
const axios = require('axios');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

const aiModel = {};
