import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './stripeToken.css';

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
        <div className='optionOne'>ADD PAYMENT OPTION 1</div>
        <div className='optionTwo'>ADD PAYMENT OPTION 2</div>
        <div className='optionThree'>ADD PAYMENT OPTION 3</div>
        <div className='optionCustom'>ADD PAYMENT OPTION CUSTOM</div>
      </div>
    </div>
  );
}

export default Stripe;
