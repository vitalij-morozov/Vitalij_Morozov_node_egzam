import './style/reset.css';
import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MainContext from './context/MainContext';

import StartPage from './pages/StartPage';
import AllAuctionsPage from './pages/AllAuctionsPage';
function App() {
  const [allAuctions, setAllAuctions] = useState([
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      timeLeft: '30s',
      bids: [],
    },
  ]);

  const auctionStates = {
    allAuctions,
    setAllAuctions,
  };

  const states = {
    auctionStates,
  };

  return (
    <div className='App'>
      <div className='container'>
        <MainContext.Provider value={states}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<StartPage />} />
              <Route path='/auctions' element={<AllAuctionsPage />} />
            </Routes>
          </BrowserRouter>
        </MainContext.Provider>
      </div>
    </div>
  );
}

export default App;
