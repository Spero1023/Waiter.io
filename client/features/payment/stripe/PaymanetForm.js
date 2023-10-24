import React, { useState, useEffect } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:8080/payment', {
          amount: 50000,
          id,
        });
        if (response.data.success) {
          console.log('payment Success');
          setSuccess(true);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (success) {
      toast.success('Success!');
      const redirectTimeout = setTimeout(() => {
        redirect();
      }, 4000);
      return () => clearTimeout(redirectTimeout);
    }
  }, [success]);

  const redirect = () => {
    navigate('/');
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className='FormGroup'>
            <div className='FormRow'>
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <Toaster />
          <h2>Thank You!</h2>
          <h3>redirecting now</h3>
          {localStorage.removeItem('cart')}
        </div>
      )}
    </>
  );
}
