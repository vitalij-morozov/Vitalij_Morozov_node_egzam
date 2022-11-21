import React from 'react';
import BidForm from './forms/BidForm';

export default function BidTable({ bids, setBids, item, isOver }) {
  const noBids = () => {
    if (!isOver) {
      return (
        <div className='no-bids'>
          <h2>No Bids Yet</h2>
        </div>
      );
    } else if (isOver && bids.length > 0) {
      return (
        <div className='winner'>
          <h2>{`This lot winner is ${bids[0].user}, with highest bid of ${bids[0].bid}`}</h2>
        </div>
      );
    } else {
      return (
        <div className='winner'>
          <h2>No bids, no winners</h2>
        </div>
      );
    }
  };

  return (
    <div className='bids-table'>
      <h2>All Bids</h2>
      <div className='all-bids'>
        {bids && !isOver && bids.length > 0
          ? bids
              .sort((a, b) => b.bid - a.bid)
              .map((bid, i) => (
                <div className='single-bid' key={i}>
                  <h3>{bid.user}</h3>
                  <span>{bid.bid}$</span>
                </div>
              ))
          : noBids()}
      </div>
      <BidForm item={item} bids={bids} setBids={setBids} />
    </div>
  );
}
