import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import AppLinks from './AppLinks';
import useNavigateTo from '../../hooks/useNavigateTo';

const Footer = () => {
    const {goHome} = useNavigateTo();

  return (
    <footer className='footer'>
        <div className='footer-container'>
        <div className="footer__logo">
            <Logo navigateTo={goHome} />
        </div>
          <div className="footer__nav">
              <ul>
                  <li><Link to="#">О проекте</Link></li>
                  <li><Link to="#">Блог</Link></li>
                  <li><Link to="#">Обратная связь</Link></li>
                  <li><Link to="#">Учителям</Link></li>
                  <li><Link to="#">Партнёрам</Link></li>
              </ul>
              <ul>
                  <li><Link to="#">Условия использования</Link></li>
                  <li><Link to="#">Политика конфиденциальности</Link></li>
                  <li><Link to="#">Куки</Link></li>
                  <li><Link to="#">Регистрация</Link></li>
              </ul>
          </div>
          <AppLinks />
        </div>
    </footer>
  )
}

export default Footer;