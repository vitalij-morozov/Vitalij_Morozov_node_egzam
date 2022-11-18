import React, { useRef } from 'react';

export default function LoginForm({ setShowLogin }) {
  const usernameRef = useRef();
  const passwordRef = useRef();

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
      <a
        onClick={() => {
          setShowLogin(false);
        }}
      >
        Or Go To Register!
      </a>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Log In
      </button>
    </form>
  );
}
