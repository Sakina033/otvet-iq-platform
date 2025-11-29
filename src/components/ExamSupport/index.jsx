import React from 'react'
import './examSupport.css'
import support from '../../assets/images/support.png'

const ExamSupport = () => {
  return (
    <section className='exam-support'>
      <div className='exam-support-container'>
        <div className="exam-support__illustration">
          <img src={support} alt="support" />
        </div>
        <div className="exam-support__content">
          <h6>Who else do you know who'll do that for you?</h6>
          <h3>I will stay with you until you pass your exam.</h3>
          <div className="exam-support__divider"></div>
          <p>Loo you mug lurgy baking cakes boot cracking goal morish up the duff haggle hotpot faff about no biggie burke, is bleeder bamboozled bite your.</p>
        </div>
      </div>
    </section>
  )
}

export default ExamSupport;