import React from 'react';
// google imports
const vision = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;

// language imports

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: 'key.json',
});

// google cloud translate API
const translateClient = new Translate({
  keyFilename: 'key.json', // Your Google Cloud Translate API key file
});

function Translator() {
  // OCR
  const processImageAndTranslate = async (imageFilePath, targetLanguage) => {
    try {
      // get the extracted text
      const [result] = await visionClient.textDetection(imageFilePath);
      const text = result.fullTextAnnotation.text;

      // console.log('Extracted text from the image:');
      // console.log(text);

      // Translate text language
      const translatedText = await translateText(text, targetLanguage);

      console.log(`Translated text (${targetLanguage}):`);
      console.log(translatedText);
    } catch (err) {
      console.error('Error occurred:', err);
    }
  };

  // Translate text function
  const translateText = async (text, targetLanguage) => {
    try {
      const [translations] = await translateClient.translate(
        text,
        targetLanguage
      );
      const translatedText = Array.isArray(translations)
        ? translations[0]
        : translations;
      return translatedText;
    } catch (err) {
      console.error('Error occurred:', err);
      return null;
    }
  };

  // function process the image and translate it
  const imageFilePath = './How_to_order_food_in_Spanish.png'; // need to make this the up loaded photo
  const targetLanguage = 'en'; // need a drop down menu for all languages we need

  processImageAndTranslate(imageFilePath, targetLanguage);

  return <div>{processImageAndTranslate(imageFilePath, targetLanguage)}</div>;
}

export default Translator;
