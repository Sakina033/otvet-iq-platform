import React, { useState } from 'react'
import './allQuestionsPage.css'
import searchIcon from '../../assets/icons/searchIcon.svg'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../store/slices/uiSlice';
import { addQuestionToFirestore, generateAIAnswer } from '../../store/slices/questionsSlice';
import QuestionList from '../../components/Question'; 

const AllQuestionPage = () => {
    const [questionText, setQuestionText] = useState('');
    const [activeSort, setActiveSort] = useState('newest'); 

    const loading = useSelector((state) => state.questions.loading);
    const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && questionText.trim()) {
            if (!user) {
                dispatch(openModal());
                setQuestionText('');
                return;
            }

            const newPost = {
                text: questionText.trim(),
                date: new Date().getTime(),
                author: user.displayName,
                avatar: user.photoURL,
                isAi: false 
            };

            dispatch(addQuestionToFirestore(newPost))
            .unwrap()
            .then((result) => {
                setQuestionText(''); 
                dispatch(generateAIAnswer({
                    questionId: result.id,
                    userQuestionText: result.text,
                })); 
            })
            .catch(err => console.error("Ошибка:", err));
        }
    }

    return (
      <div className='all-questions-page'>
        <div className="main-column">
            <div className="chat-input-wrapper">
                <img src={searchIcon} alt="" />
                <input 
                  className="chat-input"
                  type="text"
                  placeholder={ loading ? "Отправка..." : user ? 'Задай свой вопрос...' : 'Войдите, чтобы писать' } 
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
            </div>

            <div className="feed-container">
                <QuestionList activeSort={activeSort} />
            </div>
        </div>

        <div className="sidebar-right">
            <h3>Сортировка</h3>
            <ul>
                <li className={activeSort === 'newest' ? "active-sort" : ""} onClick={() => setActiveSort('newest')}>Сначала новые</li>
                <li className={activeSort === 'popular' ? "active-sort" : ""} onClick={() => setActiveSort('popular')}>Популярные</li>
                <li className={activeSort === 'my' ? "active-sort" : ""} onClick={() => setActiveSort('my')}>Мои вопросы</li>
            </ul>
        </div>
      </div>
    )
}

export default AllQuestionPage;