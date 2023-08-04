import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = 'ADDYOURKEYHERE!!!!';

function TranslationDisplay({ result, targetLanguage }) {
  const [menu, setMenu] = useState(null);
  const [text, setText] = useState(result);

  useEffect(() => {
    setText(result);
  }, [result]);


  const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions of foreign/non-American cuisine in`;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt: `${prompt}`,
          max_tokens: 512,
          temperature: 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      const generatedText = response.data.choices[0].text;
      console.log(generatedText);

      setMenu(generatedText);

    } catch (error) {
      console.error('Error calling /api/reformat-menu', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Reformat Menu</button>

      <div>
        {menu !== null
          ? menu
          : 'Upload then press Reformat Menu to translate your menu.'}
      </div>
=======
      <div>{menu !== null ? menu : 'Upload then press Reformat Menu to translate your menu.'}</div>

    </div>
  );
}

export default TranslationDisplay;

