import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');
import accessSecret from '../../server/api/secretManager';
//case sensitive for Openai
const apiKey = accessSecret(Openai);

function TranslationDisplay({
  translatedText,
  targetLanguage,
  onLanguageChange,
}) {
  const [menu, setMenu] = useState('');
  const [text, setText] = useState(translatedText);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setText(translatedText);
  }, [translatedText, targetLanguage, onLanguageChange]);

  useEffect(() => {
    handleSubmit(targetLanguage);
  }, [translatedText]);

  const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions.
  Return each section inside of a div.`;

  const handleSubmit = async () => {
    if (translatedText === '') {
      return;
    }
    try {
      setIsLoading(true);
      const toastId = toast.loading('Loading...', {
        id: toastId,
      });
      const response = await axios.post(
        `https://api.openai.com/v1/engines/text-davinci-003/completions`,
        {
          prompt: `${prompt} ${targetLanguage} 'text:' ${translatedText} `,
          max_tokens: 700,
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
      setIsLoading(false);
      toast.success('This worked', {
        id: toastId,
      });
    } catch (error) {
      console.error('Error calling /api/reformat-menu', error);
      setIsLoading(false);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div>
        {isLoading ? (
          <div>Menu Loading Below, Please Wait.</div>
        ) : (
          <div>
            {menu !== ''
              ? menu
              : 'Upload image then press submit to translate your menu.'}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default TranslationDisplay;
