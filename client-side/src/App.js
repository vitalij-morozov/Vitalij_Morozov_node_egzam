import './style/reset.css';
import './style/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MainContext from './context/MainContext';
import io from 'socket.io-client';

import StartPage from './pages/StartPage';
import AllAuctionsPage from './pages/AllAuctionsPage';
import UploadNewAuctionPage from './pages/UploadNewAuctionPage';
import SingleAuctionPage from './pages/SingleAuctionPage';
import Header from './components/Header';

const baseUrl = 'http://localhost:4001';

const socket = io.connect(baseUrl + '/');
function App() {
  const [selected, setSelected] = useState(null);

  const styleStates = {
    selected,
    setSelected,
  };

  const [allAuctions, setAllAuctions] = useState([
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      price: 100,
      timeLeft: '30s',
      bids: [],
    },
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      price: 100,
      timeLeft: '30s',
      bids: [],
    },
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      price: 100,
      timeLeft: '30s',
      bids: [],
    },
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      price: 100,
      timeLeft: '30s',
      bids: [],
    },
    {
      image:
        'https://images.unsplash.com/photo-1556596187-c3d988ea368c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
      title: 'A Duck',
      price: 100,
      timeLeft: '30s',
      bids: [],
    },
  ]);

  const auctionStates = {
    allAuctions,
    setAllAuctions,
  };

  const [loggedIn, setLoggedIn] = useState(false);

  const loginStates = {
    loggedIn,
    setLoggedIn,
  };

  const [errorMessage, setErrorMessage] = useState('');
  const [err, setErr] = useState(false);
  const errorStates = {
    errorMessage,
    setErrorMessage,
    err,
    setErr,
  };

  const states = {
    baseUrl,
    socket,
    styleStates,
    auctionStates,
    loginStates,
    errorStates,
  };

  useEffect(() => {
    socket.emit('auctions');
    socket.on('getAllItems', (data) => {
      console.log('data ===', data);
      setAllAuctions(data);
    });
  }, []);
  console.log('allAuctions ===', allAuctions);
  return (
    <div className='App'>
      <MainContext.Provider value={states}>
        <BrowserRouter>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<StartPage />} />
              <Route path='/auctions' element={<AllAuctionsPage />} />
              <Route path='/auctions/:itemId' element={<SingleAuctionPage />} />
              <Route path='/add-auction' element={<UploadNewAuctionPage />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MainContext.Provider>
    </div>
  );
}

export default App;
