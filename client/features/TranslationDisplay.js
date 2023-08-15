import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');
import Loader from './loader/loader';

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
  Return each section inside of a div. Language:`;

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
        "/api/openai",
        {
          prompt: `${prompt} ${targetLanguage} 'text:' ${translatedText}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const generatedText = response.data.message;
  
      setMenu(parse(generatedText));
      setIsLoading(false);
      toast.success('Menu Formatted', {
        id: toastId,
      });
    } catch (error) {
      console.error('Error', error);
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className='translator-container'>
      <div className='menu-container'>
        {isLoading ? (
          <div className='loading-message'>
            <Loader />
          </div>
        ) : (
          <div className='menu-content'>
            {menu !== ''
              ? menu
              : "Begin by uploading your menu & then choosing your desired language. Press 'Submit' to translate & reformat. "}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default TranslationDisplay;
