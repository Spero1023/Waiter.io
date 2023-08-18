import React from 'react';

const RestaurantContainer = ({ description, imageUrl, menu }) => {
  return (
    <Container>
      <RestaurantDescription>{description}</RestaurantDescription>
      <RestaurantImage src={imageUrl} alt="Restaurant" />
      <RestaurantMenu>{menu}</RestaurantMenu>
    </Container>
  );
};

export default RestaurantContainer;