import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ImageUploadForm from './ImgOcrTranslate';
import UserPageComponent from './features/userPage';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ImageUploadForm />} />
      <Route path='/user' element={<UserPageComponent />} />
    </Routes>
  );
};

export default App;
