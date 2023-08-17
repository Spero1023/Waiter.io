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

  const prompt = `i want you to format the following text into a html div. Here is the `;

  const handleSubmit = async () => {
    if (translatedText === '') {
      return;
    }

    try {
      setIsLoading(true);
      const toastId = toast.loading('Loading...');

      const response = await axios.post(
        '/openai/generate-response',
        JSON.stringify({
          message: ` ${prompt} text: ${translatedText}`,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const generatedText = response.data.response;
      console.log(generatedText);
      setMenu(parse(generatedText));

      toast.success('Menu Formatted', {
        id: toastId,
      });
    } catch (error) {
      console.error('Error calling /openai/generate-response', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
