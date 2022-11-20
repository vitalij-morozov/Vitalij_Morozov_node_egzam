import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

export default function Header() {
  const { userStates } = useContext(MainContext);
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    userStates.setCurrentUser(null);
    nav('/');
  };

  return (
    <header>
      <div className='container'>
        <h1 className='logo'>AUCTIONS</h1>
        {userStates.currentUser ? (
          <div className='header-right'>
            <h2>
              User: <span className='user'>{userStates.currentUser}</span>
            </h2>
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        ) : (
          <div className='header-right'>
            <button onClick={() => nav('/')}>Sign In or Register</button>
          </div>
        )}
      </div>
    </header>
  );
}
