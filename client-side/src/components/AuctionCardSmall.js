import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

export default function AuctionCardSmall({ auction }) {
  const { index, image, title, price, finished, bids, user } = auction;

  const { timer } = useContext(MainContext);

  const nav = useNavigate();

  return (
    <div className={`auction-card small ${finished ? 'finished' : ''}`}>
      <img src={image} alt={`${title} auction`} />
      <div className='text'>
        <h3 className='title'>Item: "{title}"</h3>
        {finished ? (
          <span className='fin'>This Auction is over</span>
        ) : (
          <span className='time'>
            Time Until End: <span className='value'>{timer.times[index - 1]} sec</span>
          </span>
        )}
        <span>
          Current Price: <span className='value'>${price}</span>
        </span>
        <span className='bids'>
          Bids Amount: <span className='value'>{bids.length}</span>
        </span>
        <span>
          Lot Owner:
          <span className='user'> {user}</span>
        </span>
      </div>
      <button
        onClick={() => {
          nav(`/auctions/${index}`);
        }}
        className='card-btn'
      >
        Go To Bid On This Item
      </button>
    </div>
  );
}
