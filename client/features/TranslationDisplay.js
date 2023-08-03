import React, { useState } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';

function TranslationDisplay(props) {
  const [menu, setMenu] = useState('');
  const [text, setText] = useState('');

  const handleImageSelect = async(file, language) =>{
    const formData = new FormData();
  }

  const handleSubmit = async () => {
    try {
      const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions of foreign/non-American cuisine: ${text}`;
      const response = await axios.post('/api/reformat-menu', { prompt });
      setMenu(response.data.reformattedMenu);
    } catch (error) {
      console.error('Error calling /api/reformat-menu', error);
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter menu text..."
      />
      <button onClick={handleSubmit}>Reformat Menu</button>
      <div>{menu}</div>
    </div>
  );
}


export default TranslationDisplay;
