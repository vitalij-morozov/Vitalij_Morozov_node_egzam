import React from 'react';

export default function AuctionCardSmall({ auction }) {
  const { image, title, timeLeft, price, bids } = auction;

  return (
    <div className='auction-card small'>
      <img src={image} alt={`${title} auction`} />
      <h3 className='title'>{title}</h3>
      <span className='time'>{timeLeft}</span>
      <span>{price}</span>
      <span className='bids'>{bids.length}</span>
    </div>
  );
}
