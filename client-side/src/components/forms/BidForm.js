import React, { useContext, useRef } from 'react';
import MainContext from '../../context/MainContext';

export default function BidForm() {
  const bidRef = useRef();
  const { socket } = useContext(MainContext);

  return (
    <form className='bid-form'>
      <div className='input-container'>
        <input ref={bidRef} type='number' step={0.1} name='bid' placeholder='Enter Your Bid' />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          socket.emit('updateItem', { price: 21000 });
        }}
      >
        Place A Bid
      </button>
    </form>
  );
}
