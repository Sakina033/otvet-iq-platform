import React from 'react'
import './emailForm.css'

const EmailForm = ({ emailBtn, onUnsupported }) => {
  const submitForm = (event) => {
    event.preventDefault();
    onUnsupported('E-mail');
  }
  
  return (
    <form className='email-form' onSubmit={submitForm}>
      <input className='email-input' type='email' placeholder='Введите E-mail' />
      <button type='submit' className="email-button">{emailBtn}</button>
    </form>
  )
}

export default EmailForm;