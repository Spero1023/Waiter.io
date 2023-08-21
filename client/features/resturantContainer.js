import React, {useState} from 'react';

const RestaurantContainer = ({ description, imageUrl, menu }) => {
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");
  
  return (
    <Container>
      <RestaurantDescription>{description}</RestaurantDescription>
      <RestaurantImage src={imageSrc} alt="Restaurant" onError = {() => setImgSrc("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")}/>
      <RestaurantMenu>{menu}</RestaurantMenu>
    </Container>
  );
};

export default RestaurantContainer;