import React, { useRef } from 'react';

export default function BidForm() {
  const bidRef = useRef();

  return (
    <form className='bid-form'>
      <div className='input-container'>
        <input ref={bidRef} type='number' step={0.1} name='bid' placeholder='Enter Your Bid' />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Place A Bid
      </button>
    </form>
  );
}
