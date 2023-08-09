import React from 'react';
import './loader.css';

function Loader() {
  return (
    <>
      <div class='hexagon' aria-label='Animated hexagonal ripples'>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
        <div class='hexagon__group'>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
          <div class='hexagon__sector'></div>
        </div>
      </div>
      <p class='center' aria-label='Loading'>
        Formatting...
      </p>
    </>
  );
}

export default Loader;
