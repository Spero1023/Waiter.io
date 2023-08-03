import React, { useState } from 'react';
import Header from './features/Header';
import ImageUpload from './features/ImageUpload';
import TranslationDisplay from './features/TranslationDisplay';
import axios from 'axios';

const App = () => {
  const [ocrResults, setOcrResults] = useState(null);

  const sendImageToServer = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // handle response
      console.log(response.data);

      setOcrResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <ImageUpload onFileSelect={sendImageToServer} />
        <TranslationDisplay result={ocrResults} />
      </div>
    </div>
  );
};

export default App;
