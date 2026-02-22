import './mainContent.css'
import searchIcon from '../../assets/icons/searchIcon.svg'
import arrowIcon from '../../assets/icons/arrowIcon.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openModal, closeModal } from '../../store/slices/uiSlice'
import useNavigateTo from '../../hooks/useNavigateTo'

const MainContent = () => {
  const { goAllQuestionsPage, goToLogin } = useNavigateTo();
  const user = JSON.parse(localStorage.getItem("user"));
  const showModal = useSelector((state) => state.ui.showModal);
  const dispatch = useDispatch();
  
  const handleStartChat = () => {
    if (user) {
      goAllQuestionsPage();
    } else {
      dispatch(openModal());
    }
  }

  return (
    <div className='main-content'>
        <div className="main-content__container">
            <h1>Узнай ответы на вопросы у AI-бота</h1>
            <p>В этом сообществе, основанном на знаниях, участвует свыше миллиона учеников, студентов и преподавателей и ai-бот. Благодаря такому объединению умов, здесь вы найдете отличные ответы даже на самые сложные вопросы.</p>
            <div className="main-content__actions">
                <button className='start-chat-btn' onClick={handleStartChat}>
                  <img src={searchIcon} alt="Задай свой вопрос" />
                  {user ? 'Перейти в чат' : 'Начать общение'}
                  <img src={arrowIcon} alt="arrow" />
                </button>
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