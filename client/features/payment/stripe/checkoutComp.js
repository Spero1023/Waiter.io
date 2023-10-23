import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import StripeContainer from './StripContainer';

const CheckoutPage = () => {
  const [showItem, setShowItem] = useState(true);

  return (
    <div id='container'>
      <h1 id='ThankYouText'>Than You For Your Purchase</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <button className='CheckOutBtn' onClick={() => setShowItem(true)}>
            Checkout!
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
