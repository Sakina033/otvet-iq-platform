import React from 'react';
import star from '../../assets/icons/star.svg';

const TestimonialSlide = ({ review }) => {
  return (
    <div className="testimonial-slider__slide">
      <div className="testimonial-slider__rating">
        {[...Array(review.rating)].map((_, index) => (
          <img key={index} src={star} alt="star" />
        ))}
      </div>
      <p>{review.text}</p>
      <div className="testimonial-slider__author">
        <img src={review.author_photo} alt={review.author_name} />
        <span className="author">{review.author_name}</span>
      </div>
    </div>
  );
};

export default TestimonialSlide;