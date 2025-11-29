import React from 'react'
import './popularTopics.css'
import PopularTopicsItem from './PopularTopicsItem';
import topicOne from '../../assets/images/popularTopics(1).png'
import topicTwo from '../../assets/images/popularTopics(2).png'
import topicThree from '../../assets/images/popularTopics(3).png'

const PopularTopics = () => {
  return (
    <div className='popularTopics'>
      <div className='popular-topics-container'>
        <div className="popularTopics_text">
          <h3>Популярные темы</h3>
          <p>View All Blog</p>
        </div>
        <div className="popularTopics_item">
          <PopularTopicsItem image={topicOne} />
          <PopularTopicsItem image={topicTwo} />
          <PopularTopicsItem image={topicThree} />
        </div>
      </div>
    </div>
  )
}

export default PopularTopics;