import React from 'react';
import { createRoot } from 'react-dom/client';
import Login from './login/login';
import Footer from './features/footer/footer';
import Tokens from './features/tokens/tokens';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './Routes';

const root = createRoot(document.getElementById('app'));

root.render(
  <React.StrictMode>
    <Router>
      <Login />
      <App />
      <Footer />
    </Router>
  </React.StrictMode>
);
