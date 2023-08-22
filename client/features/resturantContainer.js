import React, {useState} from 'react';


const RestaurantContainer = ({ description, imageUrl, menu }) => {
  const [imgSrc, setImgSrc] = useState("Invalid Image Source");
  
  return (
    <div>
      <div>{description}</div>
      {/* <img src={imageSrc} alt="Restaurant" onError = {() => setImgSrc("https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg")}/> */}
      <div>{menu}</div>
    </div>
  );
};

export default RestaurantContainer;