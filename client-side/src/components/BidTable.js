import React from 'react';
import BidForm from './forms/BidForm';
export default function BidTable({ bids }) {
  return (
    <div className='bids-table'>
      <h2>All Bids</h2>
      <div className='all-bids'>
        {bids && bids.length > 0 ? (
          bids.map((bid, i) => (
            <div className='single-bid' key={i}>
              <h3>{bid.username}</h3>
              <span>{bid.value}</span>
            </div>
          ))
        ) : (
          <div className='no-bids'>
            <h2>No Bids Yet</h2>
          </div>
        )}
      </div>
      <BidForm />
    </div>
  );
}
