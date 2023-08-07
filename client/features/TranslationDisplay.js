import React, { useEffect, useState } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');

const apiKey = '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';

function TranslationDisplay({
  translatedText,
  targetLanguage,
  onLanguageChange,
}) {
  const [menu, setMenu] = useState('');
  const [text, setText] = useState(translatedText);

  console.log(onLanguageChange);

  useEffect(() => {
    setText(translatedText);
  }, [translatedText, targetLanguage, onLanguageChange]);

  useEffect(() => {
    handleSubmit(targetLanguage);
  }, [translatedText]);

  const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions.
  Return each section inside of a div.
  
  `;
  console.log('132123', translatedText);

  const handleSubmit = async () => {
    if (translatedText === '') {
      return console.log('this is the text', translatedText);
    }
    try {
      const response = await axios.post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt: `${prompt} ${targetLanguage} 'text:' ${translatedText} `,
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

      setMenu(parse(generatedText));
    } catch (error) {
      console.error('Error calling /api/reformat-menu', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Reformat Menu</button>
      <div>
        {menu !== ''
          ? menu
          : 'Upload then press Reformat Menu to translate your menu.'}
      </div>
    </div>
  );
}

export default TranslationDisplay;

//need to make the prompt to be our translatedText From ImgOcrTranslate
//need to learn how to prop drill to obatain the child for Trtansleted text
//work on prompt to make it cleaner
//need to make another api key cause im an asshole!
