import React from 'react'
import './emailForm.css'

const EmailForm = ({emailBtn}) => {
  const submitForm = (event) => {
    event.preventDefault();
    alert("Вход по email пока в разработке, используйте Google")
  }
  
  return (
    <form className='email-form'>
      <input className='email-input' type='email' placeholder='Введите E-mail' />
      <button type='submit' onClick={submitForm} className="email-button">{emailBtn}</button>
    </form>
  )
}

export default EmailForm;