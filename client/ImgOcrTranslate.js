import toast, { Toaster } from 'react-hot-toast';

import React, { useState, useEffect } from 'react';
import TranslationDisplay from './features/TranslationDisplay';

const convertImageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.split(',')[1]); // Extract base64 string without data:image/...;base64,
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Function to handle translation
const handleTranslate = async (
  detectedText,
  targetLanguage,
  setTranslatedText,
  setError
) => {
  setError('');

  if (!detectedText) {
    setError('No text to translate.');
    return;
  }

  try {
    const translateResponse = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDbi-wsmaXBtJk0eVNbvi0H2rxp0M_ZZRQ`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: detectedText,
          target: targetLanguage,
        }),
      }
    );

    if (translateResponse.ok) {
      const translateData = await translateResponse.json();
      const translatedText = translateData.data.translations[0].translatedText;
      setTranslatedText(translatedText);
    } else {
      const errorData = await translateResponse.json();
      setError(errorData.error.message);
    }
  } catch (err) {
    console.error('Error occurred:', err);
    setError('An error occurred while translating the text.');
  }
};

const ImageUploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [detectedText, setDetectedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    setImageUrl(URL.createObjectURL(file));
    toast.success('Image Added');
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!imageFile) {
      setError('Please select an image.');
      return;
    }

    const base64Image = await convertImageToBase64(imageFile);

    const requestBody = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'TEXT_DETECTION', // Use 'DOCUMENT_TEXT_DETECTION' for full OCR
              maxResults: 1,
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDbi-wsmaXBtJk0eVNbvi0H2rxp0M_ZZRQ',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const detectedText = data.responses[0].fullTextAnnotation.text;
        setDetectedText(detectedText);
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred while processing the request.');
    }
  };

  // Use useEffect to call handleTranslate when detectedText or targetLanguage changes
  useEffect(() => {
    handleTranslate(detectedText, targetLanguage, setTranslatedText, setError);
  }, [detectedText, targetLanguage]);

  return (
    <div className='form-container'>
      <Toaster />
      <form className='translator-form' onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          required
        />
        <select
          className='language-select'
          value={targetLanguage}
          onChange={handleLanguageChange}
          required
        >
          <option value='en'>English</option>
          <option value='fr'>French</option>
          <option value='da'>Danish</option>
          <option value='it'>Italian</option>
        </select>
        <button className='submit-button' type='submit'>
          Submit
        </button>
      </form>
      <div className='translation-info'>
        <p>
          <strong>Detected Text:</strong> {detectedText}
        </p>
        <p>
          <strong>Translated Text:</strong> {translatedText}
        </p>
      </div>
      {imageUrl && (
        <img className='uploaded-image' src={imageUrl} alt='Uploaded' />
      )}
      <TranslationDisplay
        translatedText={translatedText}
        targetLanguage={targetLanguage}
        detectedText={detectedText}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
};

export default ImageUploadForm;
