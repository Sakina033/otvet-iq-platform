import React, { useState } from 'react'
import './mainContent.css'
import searchIcon from '../../assets/icons/searchIcon.svg'
import arrowIcon from '../../assets/icons/arrowIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../store/slices/uiSlice'
import useNavigateTo from '../../hooks/useNavigateTo'
import { addQuestionToFirestore, generateAIAnswer } from '../../store/slices/questionsSlice'

const MainContent = () => {
  const { goQuestionPage, goToLogin } = useNavigateTo();
  const user = JSON.parse(localStorage.getItem("user"));
  const [questionText, setQuestionText] = useState('');
  const showModal = useSelector((state) => state.ui.showModal);
  const loading = useSelector((state) => state.questions.loading);
  const dispatch = useDispatch();
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && questionText.trim()) {
      if(!user){
        dispatch(openModal());
        setQuestionText('');
        return;
      }

      const newPost = {
        text: questionText.trim(),
        date: new Date().getTime(),
        author: user ? user.displayName : 'Аноним',
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
  }

  return (
    <div className='main-content'>
        <div className="main-content__container">
            <h1>Узнай ответы на вопросы у AI-бота</h1>
            <p>В этом сообществе, основанном на знаниях, участвует свыше миллиона учеников, студентов и преподавателей и ai-бот. Благодаря такому объединению умов, здесь вы найдете отличные ответы даже на самые сложные вопросы.</p>
            <div className="main-content__input">
                <img src={searchIcon} alt="Задай свой вопрос" />
                <input 
                type="text" 
                placeholder={ loading ? "Отправка..." : user ? 'Задай свой вопрос...' : 'Войдите, чтобы задать вопрос'}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                />
            </div>
        </div>
        <div className="main-content__item">
            <p>Узнать ответ, задать вопрос по любому предмету?</p>
            <img src={arrowIcon} alt="arrow right" className='arrow-icon' />
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
    </div>
  )
}

export default MainContent;