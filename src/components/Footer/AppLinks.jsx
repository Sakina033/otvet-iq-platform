import React from 'react'
import googleBadge from '../../assets/badges/google-play-badge.svg'
import appStoreBadge from '../../assets/badges/app-store-badge.svg'

const AppLinks = () => {
  return (
        <div className="footer__app">
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <img src={googleBadge} alt="Google Play" />
            </a>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
              <img src={appStoreBadge} alt="App Store" />
            </a>
        </div>
  )
}

export default AppLinks;