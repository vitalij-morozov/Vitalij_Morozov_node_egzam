import React, { useContext, useRef } from 'react';
import MainContext from '../../context/MainContext';
import ErrorComponent from '../ErrorComponent';
import http from '../../plugins/http';

export default function RegisterForm({ setShowLogin }) {
  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();

  const { baseUrl, errorStates } = useContext(MainContext);
  const { err, setErr, setErrorMessage } = errorStates;

  const regHandler = (e) => {
    e.preventDefault();
    const regData = {
      username: usernameRef.current.value.trim(),
      passOne: passOneRef.current.value.trim(),
      passTwo: passTwoRef.current.value.trim(),
    };
    http.post(`${baseUrl}/register`, regData).then((data) => {
      console.log('register http data', data.details);
      if (data.error) {
        setErr(true);
        setErrorMessage(data.message);
      } else if (data.message === 'ok') {
        setErr(false);
        setShowLogin(true);
      }
    });
    usernameRef.current.value = '';
    passOneRef.current.value = '';
    passTwoRef.current.value = '';
  };

  return (
    <form className='auth-form register'>
      <div className='input-container'>
        <label htmlFor='username'>Username: </label>
        <input ref={usernameRef} type='text' name='username' placeholder='Enter Username' />
      </div>
      <div className='input-container'>
        <label htmlFor='passone'>Enter Password: </label>
        <input ref={passOneRef} type='text' name='passone' placeholder='Enter Password' />
      </div>
      <div className='input-container'>
        <label htmlFor='passtwo'>Repeat Password: </label>
        <input ref={passTwoRef} type='text' name='passtwo' placeholder='Repeat Password' />
      </div>
      <p
        onClick={() => {
          setShowLogin(true);
          setErrorMessage('');
        }}
        className='auth-link'
      >
        Go Back To Log In
      </p>
      <button onClick={regHandler}>Register</button>
      {err ? <ErrorComponent /> : ''}
    </form>
  );
}
