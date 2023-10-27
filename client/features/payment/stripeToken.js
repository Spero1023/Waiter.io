import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './stripeToken.css';

const handleQuantityChange = (productId, newQuantity) => {
  if (newQuantity >= 1) {
    const updatedCart = { ...grabCartFromStorage };
    updatedCart[productId] = newQuantity;
    window.localStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowItem(!showItem);
  }
};

function Stripe() {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };

  const getTotalAmount = () => {
    const pricePerUnit = 0.5;
    return quantity * pricePerUnit;
  };

  return (
    <div>
      <Link to='/'>
        <div className='beta'>home</div>
      </Link>
      <img className='icon' src='favicon.ico'></img>
      <div className='logo'>
        <b>
          W<span>a</span>iter.<span>io</span>
        </b>
      </div>
      <div className='paymentOptions'>
        <div className='optionOne'>5 Tokens - $2.5</div>
        <div className='optionTwo'>10 Tokens - $5</div>
        <div className='optionThree'>20 Tokens - $10</div>
        <p>
          quanity:{' '}
          <input
            className='customInput'
            type='number'
            value={quantity}
            onChange={handleQuantityChange}
          />
          ${getTotalAmount()}
        </p>
      </div>
    </div>
  );
}

export default Stripe;
