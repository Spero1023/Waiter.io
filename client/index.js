import React from 'react';
import { createRoot } from 'react-dom/client';
import UserPageComponent from './features/userPage';
import Login from './login/login';
import Footer from './features/footer/footer';
import ImageUploadForm from './ImgOcrTranslate';
import { BrowserRouter as Router } from 'react-router-dom';

const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <Router>
      <Login />
      <UserPageComponent />
      <ImageUploadForm />
      <Footer />
    </Router>
  </React.StrictMode>
);
