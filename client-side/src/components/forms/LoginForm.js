import React, { useContext, useRef } from 'react';
import MainContext from '../../context/MainContext';
import ErrorComponent from '../ErrorComponent';

import http from '../../plugins/http';
import { useNavigate } from 'react-router-dom';
export default function LoginForm({ setShowLogin }) {
  const nav = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { baseUrl, errorStates, userStates } = useContext(MainContext);
  const { err, setErr, setErrorMessage } = errorStates;

  const loginHandler = (e) => {
    e.preventDefault();
    const loginData = { username: usernameRef.current.value.trim(), password: passwordRef.current.value.trim() };

    http.post(`${baseUrl}/login`, loginData).then((data) => {
      console.log('login http data', data);
      if (data.error) {
        setErr(true);
        setErrorMessage(data.message);
      } else if (data.message === 'login ok') {
        setErr(false);
        setErrorMessage('');
        localStorage.setItem('user', data.data.username);
        userStates.setCurrentUser(localStorage.getItem('user'));
        nav('/auctions');
      }
    });
  };

  return (
    <form className='auth-form login'>
      <div className='input-container'>
        <label htmlFor=''>Username: </label>
        <input ref={usernameRef} name='username' type='text' placeholder='Enter Username' />
      </div>
      <div className='input-container'>
        <label htmlFor='password'>Password: </label>
        <input ref={passwordRef} type='text' name='password' placeholder='Enter Password' />
      </div>
      <p
        onClick={() => {
          setShowLogin(false);
          setErrorMessage('');
        }}
        className='auth-link'
      >
        Or Go To Register!
      </p>
      <button onClick={loginHandler}>Log In</button>
      {err ? <ErrorComponent /> : ''}
    </form>
  );
}
