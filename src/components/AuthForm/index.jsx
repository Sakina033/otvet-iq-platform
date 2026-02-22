import React, { useState } from 'react'
import './authForm.css'
import EmailForm from '../EmailForm';
import SocialAuth from '../SocialAuth';

const AuthForm = ({title, subtitle, emailBtn}) => {
  const [authError, setAuthError] = useState('');

  const handleUnsupported = (method) => {
    setAuthError(`Регистрация через ${method} временно недоступна 🛠️`);
    setTimeout(() => setAuthError(''), 3000);
  };

  return (
    <div className='auth-form'>
      <h1 className='auth-form__title'>{title}</h1>
      
      <SocialAuth onUnsupported={handleUnsupported} />
      
      {authError && <p className="auth-form__error-msg">{authError}</p>}

      <h3 className='auth-form__subtitle'>{subtitle}</h3>
      <EmailForm emailBtn={emailBtn} onUnsupported={handleUnsupported} />
    </div>
  )
}

export default AuthForm;