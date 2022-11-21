import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import AuctionCardSmall from '../components/AuctionCardSmall';
import { useNavigate } from 'react-router-dom';

export default function AllAuctionsPage() {
  const nav = useNavigate();

  const { auctionStates } = useContext(MainContext);
  const { allAuctions } = auctionStates;
  return (
    <div className='auctions-page'>
      <div className='top'>
        <h2>All Auctions</h2>
        <button onClick={() => nav('/add-auction')} className='nav-btn'>
          Upload New
        </button>
      </div>
      <div className='auctions'>
        {allAuctions.length > 0 ? (
          auctionStates.allAuctions.map((auction, index) => <AuctionCardSmall auction={auction} key={index} />)
        ) : (
          <h2>No Auctions Found</h2>
        )}
      </div>
    </div>
  );
}
