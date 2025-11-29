import React from 'react'
import './home.css'
import ExamSupport from '../../components/ExamSupport';
import TestimonialSlider from '../../components/testimonialSlider';
import StudyDirections from '../../components/StudyDirections';
import MainContent from '../../components/MainContent';

const Home = () => {
  return (
    <div className='home'>
      <MainContent />
      <StudyDirections/>
      <ExamSupport />
      <TestimonialSlider />
    </div>
  )
}

export default Home;