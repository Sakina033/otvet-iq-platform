import React from 'react'
import './socialAuth.css'
import Apple from '../../assets/icons/apple.svg'
import Vk from '../../assets/icons/vk.svg'
import GoogleAuth from '../Auth/GoogleAuth'

const SocialAuth = ({ onUnsupported }) => {
  return (
    <div className='social-auth social-auth__register'>
      <GoogleAuth />
      <div className="social-item" onClick={() => onUnsupported('Apple')}>
        <img src={Apple} alt="Apple" />
        <p>Создать с Apple</p>
      </div>
      <div className="social-item" onClick={() => onUnsupported('ВК')}>
        <img src={Vk} alt="Vk" />
        <p>Создать с ВК</p>
      </div>
    </div>
  )
}

export default SocialAuth;