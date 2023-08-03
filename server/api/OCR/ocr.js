const router = require('express').Router();
module.exports = router;

//import api
const vision = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: 'key.json',
});
const translateClient = new Translate({
  keyFilename: 'key.json', // Your Google Cloud Translate API key file
});

//  /api/ocr
router.post('/', async (req, res, next) => {
  try {
    const visionClient = new vision.ImageAnnotatorClient({
      keyFilename: 'key.json',
    });
    // google cloud translate API
    const translateClient = new Translate({
      keyFilename: 'key.json', // Your Google Cloud Translate API key file
    });
  } catch (err) {
    next(err);
  }
});

// processImageAndTranslate(imageFilePath, targetLanguage);
const imageFilePath = './How_to_order_food_in_Spanish.png'; // need to make this the up loaded photo
const processImage = async (imageFilePath) => {
  try {
    // get the extracted text
    const [result] = await visionClient.textDetection(imageFilePath);
    const text = result.fullTextAnnotation.text;

    return text;
  } catch (err) {
    console.error('Error occurred:', err);
  }
};

const targetLanguage = 'en'; // need a drop down menu for all languages we need
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

const imageDone = async (imageFilePath, targetLanguage) => {
  const eText = await processImage(imageFilePath);
  if (eText) {
    const tText = await translateText(eText, targetLanguage);
    console.log('spanish', eText);
    console.log('------------------------------eng', tText);
  }
};

imageDone(imageFilePath, targetLanguage);

// OCR
// const processImageAndTranslate = async (imageFilePath, targetLanguage) => {
//   try {
//     // get the extracted text
//     const [result] = await visionClient.textDetection(imageFilePath);
//     const text = result.fullTextAnnotation.text;

//     // Translate text language
//     const translatedText = await translateText(text, targetLanguage);

//     console.log(`Translated text (${targetLanguage}):`);
//     console.log(translatedText);
//   } catch (err) {
//     console.error('Error occurred:', err);
//   }
// };

// Translate text function
// const translateText = async (text, targetLanguage) => {
//   try {
//     const [translations] = await translateClient.translate(
//       text,
//       targetLanguage
//     );
//     const translatedText = Array.isArray(translations)
//       ? translations[0]
//       : translations;
//     return translatedText;
//   } catch (err) {
//     console.error('Error occurred:', err);
//     return null;
//   }
// };
