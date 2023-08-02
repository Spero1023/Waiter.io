import React from 'react';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Waiter IO</h1>
    </header>
  );
}

// You can customize these styles
const headerStyle = {
  background: '#333',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

export default Header;
