import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

export default function ErrorComponent() {
  const { errorStates } = useContext(MainContext);

  return (
    <div className='error-container'>
      <h3 className='error-message'>{errorStates.errorMessage}</h3>
    </div>
  );
}
