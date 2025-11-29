import React from 'react';
import './logo.css';

const Logo = ({navigateTo}) => {
  return (
    <div className='logo' onClick={navigateTo}>
      <span className='logo-otvet'>otvet</span>
      <span className='logo-iq'>IQ</span>
    </div>
  );
}

export default Logo;
