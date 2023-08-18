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
    if (translatedText && translatedText.trim() !== '') {
        handleSubmit(targetLanguage, translatedText);
    }
  }, [translatedText, targetLanguage, handleSubmit]);

  const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions.
  Return each section inside of a div. Language:`;

  const handleSubmit = async (targetLanguage, translatedText) => {
    const newPrompt = `${prompt} ${targetLanguage}, text: ${translatedText}`;
    if (translatedText === null || translatedText === '') {
      return;
    }
    try {
      const response = await axios.post(
        "https://us-central1-waiter-io-395214.cloudfunctions.net/openai/reformat-menu",
        {
          prompt: newPrompt
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
  
      const reformattedMenu = response.data.message;
      setMenu(parse(reformattedMenu));
    } catch (error) {
      console.error('Error', error);
      console.error('Full Error Response:', error.response.data);
      toast.error('An error occurred while reformatting. Please try again.');
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
            {menu !== '' ? (
              menu
            ) : (
              <div className='directions'>
                <div> Begin by uploading a picture of your menu</div>
                <div> Choose your desired language</div>
                <div> Hit submit & wait</div>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default TranslationDisplay;
