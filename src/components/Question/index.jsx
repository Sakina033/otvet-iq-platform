import React from 'react';
import './question.css'
import author from '../../assets/images/author.png';
import QuestionItem from './QuestionItem';
import { useSelector } from 'react-redux';

const Question = () => {
  const questions = useSelector(state => state.questions.questions);
  const loading = useSelector(state => state.questions.loading);

  if (loading) {
    return <div className="loading"><h2>Загрузка вопросов...</h2></div>
  }

  if (!questions || questions.length === 0) {
    return <div className="no-questions"><h1>Вопросов пока нет</h1></div>;
  }

  return (
    <div className='question'>
      {questions[0] && (
        <div className="question__author">
          <img src={questions[0].avatar || author} alt="author" />
          <h3>{questions[0].author}</h3>
        </div>
      )}
      <div className="question_items">
        {questions.map((q, index) => (
          <div key={q.id}>
           <QuestionItem text={q.text} date={q.date} id={q.id}/>
           {index < questions.length - 1 && <hr />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
