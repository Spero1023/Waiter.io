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

  const prompt = `No extra commentary or pleasantries. 
  Take the role of a waiter. Look and understand what the food is and then display the allergens that the dish contains. 
  The main allergins are milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, and soybeans.
  Take the following menu and categorize it by food/dish type.
  Return the menu in a div with the catagories in a h3 and the foods in a ul with the allergens after. 
  If a price is given for the item display that at the end next to the allergens. 
  I want you to write EVERYTHING in this language:`;

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
          <>
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
            <div className='caution-message'>
                Please always verify the information with the restaurant.
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
              }

export default TranslationDisplay;
