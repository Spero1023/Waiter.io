import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from '@firebase/firestore';

import parse from 'html-react-parser';

import { getAuth } from 'firebase/auth';
import { Link } from 'react-router-dom';
import '../translatorCss/logo.css';
import './footer/beta.css';
import './user.css';

const UserPageComponent = () => {
  //Menus are stored as an array with an object inside
  //User info is set as state
  const [restaurants, setRestaurants] = useState([]);
  const [user, setUser] = useState(null);

  //User info from auth
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    // This will unsubscribe the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  //Fetch menu on user state change
  useEffect(() => {
    const fetchMenu = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        //Getting doc based on userId
        const docSnapshot = await getDoc(userDocRef);
        //.exist() check for anything related to the user
        if (docSnapshot.exists()) {
          //Contains all stored menus
          const userData = docSnapshot.data();

          if (userData.menus) {
            // Sort the menus by date most recent first
            const sortedMenus = userData.menus.sort(
              (a, b) => b.time.toDate() - a.time.toDate()
            );

            // Empty object to organize menus by day
            let organizedByDay = {};

            //Each menu is converted to ISO string, then pushed to the object above
            sortedMenus.forEach((menu) => {
              const date = menu.time.toDate().toISOString().split('T')[0];
              //If there's no saved menus to push
              if (!organizedByDay[date]) {
                organizedByDay[date] = [];
              }
              organizedByDay[date].push(menu);
            });
            setRestaurants(organizedByDay);
          }
        }
      }
    };

    //Actually calling fetch menu since we're doing an anonymous functions
    fetchMenu();
    //Rerenders anytime something in user state changes.
  }, [user]);

  const deleteMenu = async (date, menuId) => {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnapshot = await getDoc(userDocRef);
    toast.success('You can now make requests again.');
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();

      if (userData.menus) {
        // Find the menu with the given date and menuId
        const updatedMenus = userData.menus.filter(
          (menu) =>
            menu.time.toDate().toISOString().split('T')[0] !== date ||
            menu.id !== menuId
        );

        // Update the menus in Firestore
        await setDoc(userDocRef, { menus: updatedMenus }, { merge: true });
        // Remove the menu from the state
        setRestaurants((prevState) => {
          const newState = { ...prevState };
          newState[date] = newState[date].filter((menu) => menu.id !== menuId);
          return newState;
        });
      }
    }
  };

  //Ugly but gets the job done
  return (
    <>
      <div className='form-container'>
        {/* BETA ICON  */}
        <Link to='/'>
          <div className='beta'>home</div>
        </Link>
        {/* BETA ICON  */}
        <img className='icon' src='favicon.ico'></img>
        <div className='logo'>
          <b>
            W<span>a</span>iter.<span>io</span>
          </b>
        </div>
        <div className='Restaurant-menus-container'>
          {restaurants && Object.keys(restaurants).length > 0 ? (
            <div className='Restaurant-menus'>
              {Object.keys(restaurants).map((date) => (
                <div key={date}>
                  <h3>{date}</h3>
                  <div className='Menu-list'>
                    {restaurants[date].map((restaurant, index) => (
                      <div key={index} className='Menu-item'>
                        {parse(restaurant.menuHtml)}
                        <button
                          onClick={() => deleteMenu(date, restaurant.id)} // Trigger delete
                          className='delete-button'
                        >
                          Delete Menu
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='empty-message'>No restaurants available.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserPageComponent;
