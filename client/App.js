import React from 'react';
import Header from './features/Header';
import ImageUpload from './features/ImageUpload';
import TranslationDisplay from './features/TranslationDisplay';

const App = () => {
  return (
    <div>
      <Header />
      <div>
        <ImageUpload/>
        <TranslationDisplay/>
      </div>
    </div>
  );
};

export default App;
