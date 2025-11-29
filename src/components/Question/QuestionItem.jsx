import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuestionFromFirestore } from '../../store/slices/questionsSlice';
import removeQ from '../../assets/icons/removeQ.svg'

const QuestionItem = ({ id, date, text}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteQuestionFromFirestore(id));
  }

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className='question-item'>
      <div className='question-in'>
        <p className="question_data">{formattedDate}</p>
        <p className="question_text">{text}</p>
      </div>
      <div className="remove_btn">
        <img src={removeQ} alt="delete question" onClick={handleDelete}/>
      </div>
    </div>
  )
}

export default QuestionItem;
