import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TranslationDisplay({ result, targetLanguage }) {
  const [menu, setMenu] = useState(null);
  const [text, setText] = useState(result);

  useEffect(() => {
    setText(result);
  }, [result]);

  const handleSubmit = async () => {
    try {
      const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions of foreign/non-American cuisine in ${targetLanguage}: ${text}`;
      if (!result || !targetLanguage) {
        return alert('No text or target language provided');
      }
      const response = await axios.post('/api/reformat-menu', { prompt });
      setMenu(response.data.message);
    } catch (error) {
      console.error('Error calling /api/reformat-menu', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Reformat Menu</button>
      <div>{menu !== null ? menu : 'Upload then press Reformat Menu to translate your menu.'}</div>
    </div>
  );
}

export default TranslationDisplay;