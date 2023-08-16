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
    handleSubmit(targetLanguage, translatedText);
  }, [translatedText]);

  const prompt = `No extra commentary or pleasantries. Take the following menu and categorize it by food/dish type, include descriptions of allergens, and offer brief descriptions.
  Return each section inside of a div. Language:`;

  const handleSubmit = async (targetLanguage, translatedText) => {
    const newPrompt = `${prompt} ${targetLanguage}, text: ${translatedText}`;
  //for some reason this is using an old openai key
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
