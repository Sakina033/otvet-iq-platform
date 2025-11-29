import React, { useState } from 'react'
import './studyDirections.css'
import StudyDirectionsItem from './StudyDirectionsItem';
import itIcon from '../../assets/icons/it-icon.svg';
import dataIcon from '../../assets/icons/data-icon.svg';
import businessIcon from '../../assets/icons/business-icon.svg';
import socialIcon from '../../assets/icons/social-icon.svg';
import biologyIcon from '../../assets/icons/biology-icon.svg';


const StudyDirections = () => {
    const [directons] = useState([
        {id: 1, icon: itIcon, text: 'It,\nнейросети'},
        {id: 2, icon: dataIcon, text: 'Data Analysis &\nStatistics'},
        {id: 3, icon: businessIcon, text: 'Business &\nManagement'},
        {id: 4, icon: socialIcon, text: 'Social Science'},
        {id: 5, icon: biologyIcon, text: 'Biology & Life\nSciences'}
    ]);

  return (
    <section className='study-directions'>
        <h2>Направления обучения</h2>
        <div className="study-directions__list">
            {directons.map((directon) => (
                <StudyDirectionsItem 
                key={directon.id}
                icon={directon.icon}
                text={directon.text}/>
            ))}
        </div>
    </section>
  )
}

export default StudyDirections;