import React from 'react';
import './profilePage.css';
import { useSelector } from 'react-redux';
import useNavigateTo from '../../hooks/useNavigateTo';
import QuestionList from '../../components/Question';

const ProfilePage = () => {
  const { goHome, goAllQuestionsPage } = useNavigateTo();
  const user = JSON.parse(localStorage.getItem("user"));
  const questions = useSelector(state => state.questions.questions);

  if (!user) {
    return (
      <div className="profile-error">
        <h2>Ой, а вы не вошли в аккаунт! 🙈</h2>
        <button className="back-btn" onClick={goHome}>На главную</button>
      </div>
    );
  }

  const myQuestionsCount = questions.filter(q => q.author === user.displayName).length;

  return (
    <div className="profile-page">
      <button className="back-to-feed-btn" onClick={goAllQuestionsPage}>
        ← Назад в ленту
      </button>

      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <img src={user.photoURL} alt="avatar" className="profile-avatar-big" />
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
          <div className="profile-stats">
            <span>Вопросов задано: <strong>{myQuestionsCount}</strong></span>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <h3 className="profile-title">Моя история вопросов</h3>
        
        <QuestionList activeSort="my" />
        
      </div>
    </div>
  )
}

export default ProfilePage;