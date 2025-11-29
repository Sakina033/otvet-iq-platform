import React from 'react'
import Google from '../../assets/icons/google.svg'
import { signInWithPopup } from 'firebase/auth'
import {auth, provider} from '../../firebase/firebase'

const GoogleAuth = () => {
  const handleGoogleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Пользователь вошел:", user.displayName);

    localStorage.setItem("user", JSON.stringify({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid
    }));

    window.location.href = '/';
  } catch (error) {
    console.error('Ошибка входа', error.message);
  }
};

  return (
    <div className="social-item" onClick={handleGoogleAuth}>
        <img src={Google} alt="Google" />
        <p>Создать с Google</p>
    </div>
  )
}

export default GoogleAuth;