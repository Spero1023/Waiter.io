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
        <div className='optionOne'>5 Tokens - $3</div>
        <div className='optionTwo'>10 Tokens - $5</div>
        <div className='optionThree'>20 Tokens - $10</div>
        <p>
          quanity: <input className='customInput' type='number' /> $
        </p>
      </div>
    </div>
  );
}

export default Stripe;
