import React from 'react';
import './Ui.css';

const UIButton = ({ children, onClick, className, ...props }) => {
  return (
    <button 
      onClick={onClick} 
      className={`ui-button ${className || ''}`}
      {...props} 
    >
      {children}
    </button>
  );
};

export default UIButton;