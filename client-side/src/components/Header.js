import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

export default function Header() {
  const { loginStates } = useContext(MainContext);
  const { loggedIn } = loginStates;

  return (
    <header>
      <h1 className='logo'>AUCTIONS</h1>
      {loggedIn ? (
        <div></div>
      ) : (
        <div className='auth-buttons'>
          <button>Sign In</button>
          <button>Register</button>
        </div>
      )}
    </header>
  );
}
