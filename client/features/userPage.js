import React from 'react';
import RestaurantContainer from './resturantContainer';
import { db } from '../firebase';
import { getAuth } from '../firebase';

const userPageComponent = () => {

    const auth = getAuth(app);
    const userID = auth.currentUser;

    if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        
        getDoc(userDocRef).then((docSnapshot) => {
          if (!docSnapshot.exists()) {
            setDoc(userDocRef, {
              name: userID,
              email: user.email
            }).then(() => {
              console.log("User document created!");
            }).catch((error) => {
              console.error("Error creating user document: ", error);
            });
          } else {
            console.log("User document already exists.");
          }
        }).catch((error) => {
          console.error("Error checking user document: ", error);
        });
      }

  // Sort the restaurants based on the timestamp in descending order
  const sortedRestaurants = restaurants.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <PageWrapper>
      <UserPage userIconUrl={userIconUrl} userName={userName} />
      {sortedRestaurants.map(restaurant => (
        <RestaurantContainer
          key={restaurant.id}
          description={restaurant.description}
          imageUrl={restaurant.imageUrl}
          menu={restaurant.menu}
        />
      ))}
    </PageWrapper>
  );
};

export default userPageComponent;