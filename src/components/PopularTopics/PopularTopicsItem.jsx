import React from 'react'

const PopularTopicsItem = ({image}) => {
  return (
    <div className='popularTopics_item-in'>
      <img src={image} alt="Topic's img" />
      <div className="popularTopics_item-text">
        <p>Разбор слова по составу</p>
        <p>Морфологический разбор</p>
        <p>Фонетический разбор</p>
      </div>
    </div>
  )
}

export default PopularTopicsItem;