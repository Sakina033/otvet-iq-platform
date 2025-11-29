import React from 'react'
import './subscription.css'
import A1 from '../../assets/images/avatar(1).png'
import A2 from '../../assets/images/avatar(2).png'
import A3 from '../../assets/images/avatar(3).png'
import A4 from '../../assets/images/avatar(4).png'
import A5 from '../../assets/images/avatar(5).png'


const Subscription = () => {
  return (
    <div className='subscription'>
      <div className="subscription-in">
        <div className="subscription-subscribe">
          <h3>Получить полный доступ</h3>
          <div className="subscription_users">
            <div className="subscription_avatars">
              <img src={A1} alt="Avatar" />
              <img src={A2} alt="Avatar" />
              <img src={A3} alt="Avatar" />
              <img src={A4} alt="Avatar" />
              <img src={A5} alt="Avatar" />
            </div>
            <p>1500+ пользователей</p>
          </div>
        </div>
        <div>
          <button className='subscribe-btn'>Оформить подписку</button>
        </div>
      </div>
    </div>
  )
}

export default Subscription;