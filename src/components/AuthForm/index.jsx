import React from 'react'
import './authForm.css'
import EmailForm from '../EmailForm';
import SocialAuth from '../SocialAuth';

const AuthForm = ({title, subtitle, emailBtn}) => {
  return (
    <div className='auth-form'>
      <h1 className='auth-form__title'>{title}</h1>
      <SocialAuth />
      <h3 className='auth-form__subtitle'>{subtitle}</h3>
      <EmailForm emailBtn={emailBtn} />
    </div>
  )
}

export default AuthForm;