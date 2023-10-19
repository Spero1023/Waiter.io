import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ImageUploadForm from './ImgOcrTranslate';
import UserPageComponent from './features/userPage';
import Stripe from './features/payment/stripeToken';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ImageUploadForm />} />
      <Route path='/user' element={<UserPageComponent />} />
      <Route path='/order' element={<Stripe />} />
    </Routes>
  );
};

export default App;
