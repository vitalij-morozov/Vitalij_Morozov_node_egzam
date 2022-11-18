import React, { useContext, useRef } from 'react';
import MainContext from '../../context/MainContext';
import ErrorComponent from '../ErrorComponent';

import http from '../../plugins/http';
import { useNavigate } from 'react-router-dom';
export default function LoginForm({ setShowLogin }) {
  const nav = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();

  const { baseUrl, errorStates } = useContext(MainContext);
  const { err, setErr } = errorStates;

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
        }}
      >
        Or Go To Register!
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          const loginData = { username: usernameRef.current.value, password: passwordRef.current.value };
          http.post(`${baseUrl}/login`, loginData).then((data) => {
            console.log('login http data', data);
            if (data.error) {
              setErr(true);
              errorStates.setErrorMessage(data.message);
            } else if (data.message === 'ok') {
              setErr(false);
              localStorage.setItem('userToken', data.data.secret);
              nav('/auctions');
            }
          });
          usernameRef.current.value = '';
          passwordRef.current.value = '';
        }}
      >
        Log In
      </button>
      {err ? <ErrorComponent /> : ''}
    </form>
  );
}
