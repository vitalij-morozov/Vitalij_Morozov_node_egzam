import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MainContext from '../context/MainContext';

export default function AuctionCardSmall({ auction, idx }) {
  const { index, image, title, timeLeft, price, bids } = auction;
  const { styleStates } = useContext(MainContext);
  const { selected, setSelected } = styleStates;

  const nav = useNavigate();

  console.log('idx  ===', idx);
  return (
    <div className={`auction-card small ${selected === idx ? 'selected' : ''}`} onClick={() => setSelected(idx)}>
      <img src={image} alt={`${title} auction`} />
      <div className='text'>
        <h3 className='title'>Item: "{title}"</h3>
        <span className='time'>
          Time Until End: <span className='value'>{timeLeft}</span>
        </span>
        <span>
          Current Price: <span className='value'>${price}</span>
        </span>
        <span className='bids'>
          Bids Amount: <span className='value'>{bids.length}</span>
        </span>
      </div>
      <button
        onClick={() => {
          nav(`/auctions/${index}`);
        }}
      >
        Go To Bid On This Item
      </button>
    </div>
  );
}
