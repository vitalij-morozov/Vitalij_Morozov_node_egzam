import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateAuctionForm from '../components/forms/CreateAuctionForm';
export default function UploadNewAuctionPage() {
  const nav = useNavigate();

  return (
    <div className='add-page'>
      <div className='top'>
        <h2 className='subtitle'>Add New Auction Item</h2>
        <button onClick={() => nav('/auctions')} className='nav-btn'>
          Go Back
        </button>
      </div>
      <CreateAuctionForm />
    </div>
  );
}
