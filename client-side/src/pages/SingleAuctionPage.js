import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import AuctionCardBig from '../components/AuctionCardBig';
import BidTable from '../components/BidTable';
export default function SingleAuctionPage() {
  const nav = useNavigate();

  const { auctionStates } = useContext(MainContext);

  const { itemId } = useParams();
  console.log('itemId ===', itemId);
  return (
    <div className='item-page'>
      <div className='top'>
        <h2 className='subtitle'>{`pls`}</h2>
        <button className='nav-btn' onClick={() => nav('/auctions')}>
          Go Back To All Auctions
        </button>
      </div>
      <div className='single-auction'>
        <AuctionCardBig item={auctionStates.allAuctions[itemId]} />
        <BidTable bids={auctionStates.allAuctions[itemId].bids} />
      </div>
    </div>
  );
}
