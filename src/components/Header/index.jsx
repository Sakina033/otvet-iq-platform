import React, { useState } from 'react'
import './header.css'
import loginIcon from '../../assets/icons/loginIcon.svg'
import searchIcon from '../../assets/icons/searchIcon.svg'
import question from '../../assets/icons/question.svg'
import Logo from '../Logo'
import useNavigateTo from '../../hooks/useNavigateTo'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../store/slices/uiSlice'
import { addQuestionToFirestore, generateAIAnswer } from '../../store/slices/questionsSlice';

const Header = () => {
  const { goToLogin, goHome, goQuestionPage } = useNavigateTo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const showModal = useSelector((state) => state.ui.showModal);
  const loading = useSelector((state) => state.questions.loading);
  const dispatch = useDispatch();

  const getUserFromLS = () => {
    try {
      const item = localStorage.getItem("user");
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  };
  
  const user = getUserFromLS();

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && questionText.trim()) {
      if(!user) {
        dispatch(openModal());
        setQuestionText('');
        return;
      }

      const newPost = {
        text: questionText.trim(),
        date: new Date().getTime(),
        author: user ? user.displayName : "Аноним",
        avatar: user?.photoURL || null,
      };

      dispatch(addQuestionToFirestore(newPost))
      .unwrap()
      .then(() => {
         dispatch(generateAIAnswer(questionText.trim()));
      })
      .catch(err => console.error("Ошибка добавления вопроса:", err));
      
      goQuestionPage();
      setQuestionText('');
    }
  };

  return (
    <header className='header'>
      <div className='header-container'>
        <div className='header__logo-search'>
          <Logo navigateTo={goHome} />
          <div className='header__search'>
            <img src={searchIcon} alt="search" />
            <input 
            type='text' 
            placeholder={ loading ? "Отправка..." : user ? 'Задай свой вопрос...' : 'Войдите, чтобы задать вопрос'} 
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            />
          </div>
        </div>

        {showModal && (
          <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
            <div className="modal">
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
            <div className='header__profile' onClick={toggleMenu}>
              <img src={user.photoURL} alt='avatar' className='header__avatar' />
              <p className='header__name'>
                {user.displayName}
              </p>

              {menuOpen && (
                <div className='header__dropdown'>
                  <button className='header__logout-btn' onClick={handleLogout}>
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

          <div className="header__question" onClick={goQuestionPage}>
            <img src={question} alt="Question page" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;
