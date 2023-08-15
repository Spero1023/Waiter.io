import React from 'react';
import './loader.css';

function Loader() {
  return (
    <>
      <div className='hexagon' aria-label='Animated hexagonal ripples'>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
        <div className='hexagon__group'>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
          <div className='hexagon__sector'></div>
        </div>
      </div>
      <p className='center' aria-label='Loading'>
        Formatting...
      </p>
    </>
  );
}

export default Loader;
