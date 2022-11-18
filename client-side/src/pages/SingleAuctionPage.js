import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import AuctionCardBig from '../components/AuctionCardBig';
import BidTable from '../components/BidTable';
export default function SingleAuctionPage() {
  const nav = useNavigate();

  const { socket } = useContext(MainContext);

  const [singleItem, setSingleItem] = useState({});

  const { itemId } = useParams();

  useEffect(() => {
    socket.emit('itemById', itemId);
    socket.on('getItem', (data) => {
      setSingleItem(data);
    });
  }, [singleItem]);

  console.log('singleItem ===', singleItem);
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
        <AuctionCardBig item={singleItem} />
        <BidTable bids={singleItem.bids} />
      </div>
    </div>
  );
}
