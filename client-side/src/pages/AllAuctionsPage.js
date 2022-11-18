import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import AuctionCardSmall from '../components/AuctionCardSmall';

export default function AllAuctionsPage() {
  const { auctionStates } = useContext(MainContext);
  const { allAuctions } = auctionStates;

  return (
    <div>
      <div className='top'>
        <h1>All Auctions</h1>
        <button>Upload New</button>
      </div>
      <div className='auctions'>
        {allAuctions ? (
          auctionStates.allAuctions.map((auction, index) => <AuctionCardSmall auction={auction} key={index} />)
        ) : (
          <h2>No Auctions Found</h2>
        )}
      </div>
    </div>
  );
}
