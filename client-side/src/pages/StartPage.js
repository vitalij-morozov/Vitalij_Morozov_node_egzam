import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm';
import RegisterForm from '../components/forms/RegisterForm';
export default function StartPage() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div>{showLogin ? <LoginForm setShowLogin={setShowLogin} /> : <RegisterForm setShowLogin={setShowLogin} />}</div>
  );
}
