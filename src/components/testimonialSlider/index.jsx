import React, { useEffect, useState } from 'react'
import './testimonialSlider.css'
import TestimonialSlide from './TestimonialSlide';
import arrowLeft from '../../assets/icons/arrowLeft.svg'
import arrowRight from '../../assets/icons/arrowRight.svg'

const TestimonialSlider = () => {
  const [reviews, setReviews] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
  fetch('/data/reviews.json')
    .then(res => res.json())
    .then(data => {
      setReviews(data)
    });
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + reviews.length) % reviews.length)
  }

  return (
    <section className="testimonial-slider__container">
      <div className="testimonial-container">
        <div className="testimonial-slider__header">
          <img src={arrowLeft} alt="arrow left" onClick={prevSlide} />
          <h2>Лучшие отзывы и мнения о нас</h2>
          <img src={arrowRight} alt="arrow right" onClick={nextSlide} />
        </div>

        <img src={arrowLeft} alt="arrow left" onClick={prevSlide} className='arrow-left' />
        <div className='testimonial-slider'>
          {reviews.length > 0 && (
            <TestimonialSlide review={reviews[currentSlide]}/> 
          )}
        </div>
        <img src={arrowRight} alt="arrow right" onClick={nextSlide} className='arrow-right' />
      </div>
    </section>
  )
};

export default TestimonialSlider;