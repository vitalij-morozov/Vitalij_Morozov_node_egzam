import React, { useRef } from 'react';

export default function CreateAuctionForm() {
  const imageRef = useRef();
  const titleRef = useRef();
  const timeRef = useRef();
  const priceRef = useRef();

  return (
    <form className='auction-form'>
      <div className='input-container'>
        <label htmlFor='item-image-url'>Item Image URL: </label>
        <input ref={imageRef} type='url' name='item-image-url' placeholder='Enter item image URL' />
      </div>
      <div className='input-container'>
        <label htmlFor='item-title'>Item Title: </label>
        <input ref={titleRef} type='url' name='item-title' placeholder='Enter item title' />
      </div>
      <div className='input-container'>
        <label htmlFor='item-time'>Time Until Auction Deadline: </label>
        <select ref={timeRef} name='item-time' id='item-time'>
          <option value='1'>1 minute</option>
          <option value='2'>2 minutes</option>
          <option value='3'>3 minutes</option>
          <option value='4'>4 minutes</option>
          <option value='5'>5 minutes</option>
        </select>
      </div>
      <div className='input-container'>
        <label htmlFor='image-url'>Item Price: </label>
        <input ref={priceRef} type='number' step={0.1} name='image-url' placeholder='Enter item price' />
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Place An Auction
      </button>
    </form>
  );
}
