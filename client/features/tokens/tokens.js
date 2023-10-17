import React, { useState } from 'react';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import './tokens.css';

function Tokens() {
  return (
    <div>
      <div className='token'>
        <button className='tokenBtn'>
          <MenuBookTwoToneIcon /> 20
        </button>
      </div>
    </div>
  );
}

export default Tokens;
