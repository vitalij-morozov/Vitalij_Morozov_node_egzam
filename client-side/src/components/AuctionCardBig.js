import React, { useContext, useEffect, useState } from 'react';
import MainContext from '../context/MainContext';

export default function AuctionCardBig({ item }) {
  const { socket, timer } = useContext(MainContext);

  const { index, image, title, timeLeft, price, user } = item;

  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    socket.on('updatedTime', (data) => {
      setTime(data);
    });
  }, [time, socket]);

  return (
    <div className='auction-card big'>
      <img src={image} alt='' />
      <div className='text'>
        <h3 className='title'>Item: "{title}"</h3>
        <span className='time'>
          Time Until End: <span className='value'>{timer.times[index - 1]}sec</span>
        </span>
        <span>
          Start Price: <span className='value'>${price}</span>
        </span>
        <span>
          Lot Owner:
          <span className='user'> {user}</span>
        </span>
      </div>
    </div>
  );
}
