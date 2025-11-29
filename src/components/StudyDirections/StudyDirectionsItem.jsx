import React from 'react'

const StudyDirectionsItem = ({icon, text}) => {
  return (
    <div className="study-directions__item">
        <img src={icon} alt={text} />
        <p>{text}</p>
    </div>
  )
}

export default StudyDirectionsItem;