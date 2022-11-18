import React from 'react';

export default function AuctionCardBig({ item }) {
  const { image, title, timeLeft, price } = item;

  return (
    <div className='auction-card big'>
      <img src={image} alt='' />
      <div className='text'>
        <h3 className='title'>Item: "{title}"</h3>
        <span className='time'>
          Time Until End: <span className='value'>{timeLeft}</span>
        </span>
        <span>
          Current Price: <span className='value'>${price}</span>
        </span>
      </div>
    </div>
  );
}
