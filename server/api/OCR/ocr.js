const router = require('express').Router();
module.exports = router;

//import api
const vision = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;

const visionClient = new vision.ImageAnnotatorClient({
  keyFilename: 'key.json',
});
const translateClient = new Translate({
  keyFilename: 'key.json',
});

//  /api/ocr
router.post('/', async (req, res, next) => {
  try {
    const imageFilePath = req.file.path;
    const targetLanguage = req.body.targetLanguage || 'en';

    const extractedText = await processImage(imageFilePath);
    if (extractedText) {
      const translatedText = await translateText(extractedText, targetLanguage);
      res.json({ originalText: extractedText, translatedText });
    } else {
      res.status(400).json({ error: 'Text extraction failed.' });
    }
  } catch (err) {
    next(err);
  }
});

const processImage = async (imageFilePath) => {
  try {
    const [result] = await visionClient.textDetection(imageFilePath);
    const text = result.fullTextAnnotation.text;
    return text;
  } catch (err) {
    console.error('Error occurred:', err);
    return null;
  }
};

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
