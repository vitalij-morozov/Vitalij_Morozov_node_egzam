import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import AuctionCardBig from '../components/AuctionCardBig';
import BidTable from '../components/BidTable';

export default function SingleAuctionPage() {
  const nav = useNavigate();

  const { socket, timer } = useContext(MainContext);

  const [singleItem, setSingleItem] = useState({});

  const [isOver, setIsOver] = useState(false);
  const [bids, setBids] = useState([]);

  const { itemId } = useParams();

  useEffect(() => {
    socket.emit('itemById', itemId);
    socket.on('getItem', (data) => {
      setSingleItem(data);
      setBids(data.bids);
    });
  }, [itemId, socket]);

  useEffect(() => {
    setIsOver(timer.times[singleItem.index - 1] === 0 ? true : false);
  }, [timer.times, singleItem]);

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
        <BidTable bids={bids} setBids={setBids} item={singleItem} isOver={isOver} />
      </div>
    </div>
  );
}
