import React, { useEffect } from 'react';
import './question.css';
import QuestionItem from './QuestionItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestionsFromFirestore } from '../../store/slices/questionsSlice';

const QuestionList = ({ activeSort }) => {
  const dispatch = useDispatch();
  
  const questions = useSelector(state => state.questions.questions);
  const loading = useSelector(state => state.questions.loading);
  const searchQuery = useSelector(state => state.questions.searchQuery || "");
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(fetchQuestionsFromFirestore());
  }, [dispatch]);

  if (loading && questions.length === 0) {
    return <div className="loading"><h2>Загрузка...</h2></div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="no-questions"><h3>Пока пусто! Задай первый вопрос! 🚀</h3></div>;
  }

  let sortedQuestions = [...questions]; 

  if (searchQuery.trim() !== '') {
    sortedQuestions = sortedQuestions.filter(q => 
      q.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (activeSort === 'my') {
    sortedQuestions = sortedQuestions.filter(q => user && q.author === user.displayName);
  } 
  else if (activeSort === 'popular') {
    sortedQuestions.sort((a, b) => {
      const aLen = a.conversation ? a.conversation.length : 0;
      const bLen = b.conversation ? b.conversation.length : 0;
      return bLen - aLen; 
    });
  }

  return (
    <div className='question-list'>
      {sortedQuestions.length === 0 ? (
        <div className="no-questions">
          <h3>Ничего не найдено 🕵️‍♀️</h3>
          <p>Попробуй изменить запрос или категорию.</p>
        </div>
      ) : (
        sortedQuestions.map((q) => (
          <QuestionItem 
              key={q.id} 
              id={q.id}
              date={q.date || q.createdAt} 
              author={q.author} 
              avatar={q.avatar} 
              conversation={q.conversation} 
          />
        ))
      )}
    </div>
  );
};

export default QuestionList;