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
  Return the menu in a div with the catagories in a h3 and the dishes in a ul with the allergens after. If a price is given for the item display that at the end next to the allergens`;

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
        '/openai/generate-response', // Use the backend route here
        {
          message: `${prompt} ${targetLanguage} 'text:' ${translatedText} `,
        }
      );

      const generatedText = response.data.response;
      setMenu(parse(generatedText));
      setIsLoading(false);
      toast.success('Menu Formatted', {
        id: toastId,
      });
    } catch (error) {
      console.error('Error calling /openai/generate-response', error);
      setIsLoading(false);
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
