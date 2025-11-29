import React from 'react'
import './loginPage.css'
import AuthForm from '../../components/AuthForm';
import UiButton from '../../components/UI/UiButton';
import useNavigateTo from '../../hooks/useNavigateTo'

const LoginPage = () => {
  const {goToRegister} = useNavigateTo();

  return (
    <div className='login-page'>
      <div className="login-page__container">
        <AuthForm title={'Вход на сайт'} emailBtn={'Войти'} />
        <UiButton onClick={goToRegister}>
          или Зарегистрируйся
        </UiButton>
      </div>
    </div>
  )
}

export default LoginPage;