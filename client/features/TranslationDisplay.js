import toast, { Toaster } from 'react-hot-toast';
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
const parse = require('html-react-parser');
import Loader from './loader/loader';
import { auth, db } from '../firebase';
import { Timestamp, doc, setDoc, getDoc } from '@firebase/firestore';

function TranslationDisplay({
  translatedText,
  targetLanguage,
  onLanguageChange,
}) {
  const [menu, setMenu] = useState('');
  const [text, setText] = useState(translatedText);
  const [isLoading, setIsLoading] = useState(false);


  //Spam protection
  const countRef = useRef(0);
  const decrementTimeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const handleCountDecrement = () => {
    if (countRef.current > 0) {
      countRef.current -= 1;
    }
    decrementTimeoutRef.current = setTimeout(handleCountDecrement, 10000);
  };

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

    //Spamming more than 10 times will result in timeout for 1 minute
    if (countRef.current >= 10) {
      toast.error("You've made too many requests. Please wait a minute.");
      if (!resetTimeoutRef.current) {
        resetTimeoutRef.current = setTimeout(() => {
          countRef.current = 0;
          clearTimeout(decrementTimeoutRef.current);
          decrementTimeoutRef.current = null;
          resetTimeoutRef.current = null;
          toast.success("You can now make requests again.");
        }, 60000);
      }
      return;
    }
    // Adds 1 to each submit
    countRef.current += 1;
    // Subtracts 1 every 10 seconds
    if (!decrementTimeoutRef.current) {
      decrementTimeoutRef.current = setTimeout(handleCountDecrement, 10000);
    }

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
  
  const saveMenuToFirestore = async () => {
    try {
      // Check if there's a logged-in user
      if (!auth.currentUser) {
        toast.error("You need to be logged in to save the menu.");
        return;
      }
  
      const uid = auth.currentUser.uid;
  
      // Reference to the user's document in Firestore
      const userRef = doc(db, 'users', uid);
  
      // Fetch the current document to get the current menus
      const docSnapshot = await getDoc(userRef);
  
      let currentMenus = [];
      if (docSnapshot.exists() && docSnapshot.data().menus) {
        currentMenus = docSnapshot.data().menus;
      }
  
      // Add the new menu to the list
      const newMenu = {
        menuHtml: text,
        time: Timestamp.now()
      };
      currentMenus.push(newMenu);
  
      // Update the user's document with the updated menus list
      await setDoc(userRef, {
        menus: currentMenus
      }, { merge: true });
  
      toast.success("Menu saved successfully!");
  
    } catch (error) {
      console.error("Error saving menu: ", error);
      toast.error("There was an error saving the menu.");
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
                <>
                {menu}
                <button onClick={saveMenuToFirestore}>Save to history</button>
                </>
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
