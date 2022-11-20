import React, { useContext, useRef } from 'react';
import MainContext from '../../context/MainContext';

export default function BidForm({ item, bids, setBids }) {
  const bidRef = useRef();
  const { socket, userStates } = useContext(MainContext);

  const bidFormHandler = (e) => {
    e.preventDefault();
    if (bidRef.current.value <= item.price) {
      return alert('bid is too low');
    }
    console.log('item ===', item);
    if (bids.length > 0 && bidRef.current.value <= bids[0].bid) {
      return alert('You must bid more than other bids');
    }
    if (userStates.currentUser === item.user) {
      return alert('You cannot bid on your own lot');
    }
    const newData = {
      id: item.index,
      newBid: {
        bid: bidRef.current.value.trim(),
        user: userStates.currentUser,
      },
    };
    console.log('newBid ===', newData);
    socket.emit('updateBids', newData);
    socket.on('getBid', (data) => {
      setBids([...bids, data]);
      console.log(data, bids);
    });
  };

  return (
    <form className='bid-form'>
      <div className='input-container'>
        <input
          ref={bidRef}
          type='number'
          step={0.1}
          name='bid'
          placeholder={item.finished ? 'This auction is over' : 'Enter Your Bid'}
          disabled={item.finished ? true : false}
        />
      </div>
      <button type='submit' onClick={bidFormHandler} disabled={item.finished ? true : false}>
        Place A Bid
      </button>
    </form>
  );
}
