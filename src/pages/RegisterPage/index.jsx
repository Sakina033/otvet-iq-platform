import React from 'react'
import './registerPage.css'
import AuthForm from '../../components/AuthForm';
import UIButton from '../../components/UI/UiButton';
import useNavigateTo from '../../hooks/useNavigateTo';

const RegisterPage = () => {
  const {goToLogin} = useNavigateTo();
  return (
    <div className='register-page'>
      <div className="register-page__container">
        <AuthForm title={'Присоединяйся к нам!'} subtitle={'Зарегестрируйтесь'} emailBtn={'Регистрация'}/>
        <UIButton onClick={goToLogin}>
          Уже есть аккаунт? Войти
        </UIButton>
      </div>
    </div>
  )
}

export default RegisterPage;