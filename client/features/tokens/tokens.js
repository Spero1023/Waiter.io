import React, { useState } from 'react';
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { Link } from 'react-router-dom';
import './tokens.css';

function Tokens() {
  return (
    <div>
      <div className='token'>
        <Link to='/order'>
          <button className='tokenBtn'>
            <MenuBookTwoToneIcon /> 20
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Tokens;
