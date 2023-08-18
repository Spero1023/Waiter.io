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


  const prompt = `No extra commentary or pleasantries. 
  Take the role of a waiter. Look and understand what the food is and then display the allergens that the dish contains. 
  The main allergins are milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, and soybeans.
  Take the following menu and categorize it by food/dish type.
  Return the menu in a div with the catagories in a h3 and the foods in a ul with the allergens after. 
  If a price is given for the item display that at the end next to the allergens. 
  I want you to write EVERYTHING in this language:`;

  const apiKey = 'MY_KEY';
  const handleSubmit = async () => {
    if (translatedText === '') {
      return;
    }
    setIsLoading(true)
   try {
    const response = await axios.post(
      `https://api.openai.com/v1/engines/text-davinci-003/completions`,
      {
        prompt: `${prompt} ${targetLanguage} .'text:' ${translatedText} `,
        max_tokens: 700,
        temperature: 1,
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
    toast.success('Menu Formatted');
  } catch(error){
      console.error('Error calling /api/reformat-menu', error);
      setIsLoading(false);
      toast.error('An error occurred. Please try again.');
  }
  } 

  

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
