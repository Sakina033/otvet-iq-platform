import React from 'react'
import './questionPage.css'
import Subscription from '../../components/Subscription';
import PopularTopics from '../../components/PopularTopics';
import Question from '../../components/Question';

const QuestionPage = () => {
  return (
    <div className='question-page'>
        <Question />
        <Subscription />
        <PopularTopics />
    </div>
  )
}

export default QuestionPage;