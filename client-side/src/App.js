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
  const [currentUser, setCurrentUser] = useState('');

  console.log('currentUser ===', currentUser);
  const userStates = {
    currentUser,
    setCurrentUser,
  };

  const [times, setTimes] = useState([]);

  const timer = {
    times,
    setTimes,
  };

  const [allAuctions, setAllAuctions] = useState([]);

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
    userStates,
    auctionStates,
    loginStates,
    errorStates,
    timer,
  };

  useEffect(() => {
    socket.emit('auctions');
    socket.on('getAllItems', (data) => {
      setAllAuctions(data);
    });
  }, []);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setCurrentUser(localStorage.getItem('user'));
    } else {
      setCurrentUser('');
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('timeUpdate');
      socket.on('updatedTime', (data) => {
        setTimes(data);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  // console.log('allAuctions ===', allAuctions);
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
