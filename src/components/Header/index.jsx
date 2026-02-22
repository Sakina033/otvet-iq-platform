import React, { useState, useEffect, useRef } from 'react'
import './header.css'
import loginIcon from '../../assets/icons/loginIcon.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'
import Logo from '../Logo'
import useNavigateTo from '../../hooks/useNavigateTo'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../store/slices/uiSlice'
import { setSearchQuery } from '../../store/slices/questionsSlice'

const Header = () => {
  const { goToLogin, goHome, goAllQuestionsPage, goProfilePage } = useNavigateTo();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const showModal = useSelector((state) => state.ui.showModal);
  const searchQuery = useSelector(state => state.questions.searchQuery || "");
  const dispatch = useDispatch();
  
  const profileRef = useRef(null);

  const getUserFromLS = () => {
    try {
      const item = localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  };
  
  const user = getUserFromLS();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    if (user) {
      goAllQuestionsPage()
    } else {
      goHome()
    }
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        goHome(); 
      })
      .catch((error) => {
        console.error("Ошибка выхода:", error.message);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header__logo-search'>
          <Logo navigateTo={handleLogoClick} />
          <div className="header__search">
            <img src={searchIcon} alt="search" />
            <input 
              type='text' 
              placeholder={user ? "Поиск по вопросам..." : "Начать общение"}
              value={user ? searchQuery : ""}
              readOnly={!user}
              onClick={() => {
                if (!user) dispatch(openModal());
              }}
              onChange={(e) => {
                if (!user) {
                  dispatch(openModal());
                  return;
                }
                dispatch(setSearchQuery(e.target.value));
                if (window.location.pathname !== '/questions') {
                  goAllQuestionsPage();
                }
              }}
           />
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Войдите в аккаунт</h2>
              <p>Чтобы задать вопрос, нужно войти или зарегистрироваться.</p>
              <div className="modal-buttons">
                <button onClick={goToLogin}>Войти</button>
                <button onClick={() => dispatch(closeModal())}>Закрыть</button>
              </div>
            </div>
          </div>
        )}
      
        <div className="header__in">
          {user ? (
            <div className='header__profile' ref={profileRef} onClick={toggleMenu}>
              <img src={user.photoURL} alt='avatar' className='header__avatar' />
              <p className='header__name'>
                {user.displayName}
              </p>

              {menuOpen && (
                <div className='header__dropdown'>
                  <button className='header__dropdown-item' onClick={goProfilePage}>
                    Мои вопросы
                  </button>
                  <button className='header__dropdown-item header__logout-btn' onClick={handleLogout}>
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className='header__login-btn' onClick={goToLogin}>
              <img src={loginIcon} alt='login' />
              Войти
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;