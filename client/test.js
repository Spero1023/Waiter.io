import React, { useState } from 'react';

const ImageUploadForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [result, setResult] = useState({
    originalText: '',
    translatedText: '',
  });
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
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
        // Handle the response data as needed
        const detectedText = data.responses[0].fullTextAnnotation.text;
        console.log(detectedText);
        setResult({
          detectedText: detectedText,
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError('An error occurred while processing the request.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          required
        />
        <select value={targetLanguage} onChange={handleLanguageChange} required>
          <option value='en'>English</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
      {error && <p>Error: {error}</p>}
      <div>
        <p>
          <strong>Original Text:</strong> {result.originalText}
        </p>
        <p>
          <strong>Translated Text:</strong> {result.translatedText}
        </p>
      </div>
    </div>
  );
};

export default ImageUploadForm;
