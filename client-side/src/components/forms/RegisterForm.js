import React, { useRef } from 'react';

export default function RegisterForm({ setShowLogin }) {
  const usernameRef = useRef();
  const passOneRef = useRef();
  const passTwoRef = useRef();

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
      <a
        onClick={() => {
          setShowLogin(true);
        }}
      >
        Go Back To Log In
      </a>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Register
      </button>
    </form>
  );
}
