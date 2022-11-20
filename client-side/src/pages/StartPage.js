import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
import MainContext from '../context/MainContext';
export default function StartPage() {
  const [showLogin, setShowLogin] = useState(true);

  const { userStates } = useContext(MainContext);

  const nav = useNavigate();

  useEffect(() => {
    if (userStates.currentUser) {
      nav('/auctions');
    }
  }, [nav, userStates.currentUser]);

  return (
    <div>{showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}</div>
  );
}
