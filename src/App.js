import './App.css';
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Box, Popover, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/index';
import { CustomPopover } from './components/CustomPopover';
import Menu from './containers/Menu';
import Navbar from './components/navbar/Navbar';
import TermsModal from './components/TermsModal';
import Enter from './components/Enter/Enter';
const Faqs = React.lazy(() => import('./containers/FAQs'));
const Rules = React.lazy(() => import('./containers/Rules/Rules'));
const Tokenomics = React.lazy(() => import('./containers/Tokenomics/Tokenomics'));
const About = React.lazy(() => import('./containers/About/About'));

const Home = React.lazy(() => import('./containers/Home/Home'));
const Roulette = React.lazy(() => import('./containers/Roulette/Maintenance'));
const Sports = React.lazy(() => import('./containers/Sports/Sports'));
const PriceCallsRoom = React.lazy(() => import('./containers/PriceCalls/Maintaince'));
const FortuneWheel = React.lazy(() => import('./containers/FortuneWheel/Maintenance'));
const PowerballCategory = React.lazy(() => import('./containers/Powerball/Maintenance'));
const Main = React.lazy(() => import('./containers/Main'));

const REACT_APP_PLSP = process.env.REACT_APP_PLSP;

export default function App(props) {
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const clickAccepted = () => {
    localStorage.setItem('accepted_terms', true);
    setAcceptedTerms(true);
  };
  // popover anchor state
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popOverId = 'simple-enter-popover';

  useEffect(() => {
    const accepted = localStorage.getItem('accepted_terms');
    if (!accepted) setAcceptedTerms(false);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        className={props.isDarkMode ? 'App dark_bg scrollbar' : 'App light_bg'}
        onClick={() => {
          props.setShowChain(false);
          props.setShowToken(false);
          props.setShowMenu(false);
        }}
        onScroll={(e, r) => {
          if (document.getElementsByClassName('App')[0].scrollTop > 20) {
            document.getElementsByClassName('mobile-header')[0].style.backgroundColor = 'rgb(45 46 54)';
            document.getElementsByClassName('mobile-header')[0].style.boxShadow = 'rgb(25 26 24) -1px 4px 7px 4px';
            document.getElementsByClassName('mobile-header')[0].style['border-radius'] = ' 0px 0px 20px 20px';
          } else {
            document.getElementsByClassName('mobile-header')[0].style.backgroundColor = '';
            document.getElementsByClassName('mobile-header')[0].style.boxShadow = '';
          }
        }}
      >
        <Menu
          setShowToken={props.setShowToken}
          showToken={props.showToken}
          potAddress={props.potAddress}
          PULSEPOT={props.PULSEPOT}
          userInfo={props.PULSEPOT.userInfo}
          connectWallet={props.connectWallet}
          BNBP_MARKET_PRICE={props.PULSEPOT.BNBP_MARKET_PRICE}
          userPlsp={props.PULSEPOT.userInfo['BNBP_balance']}
          totalPlspClaimed={props.PULSEPOT.potInfo['p_phase' + REACT_APP_PLSP]}
          setShowMenu={props.setShowMenu}
          showMenu={props.showMenu}
          page={props.page}
          setPage={props.setPage}
          isDarkMode={props.isDarkMode}
          setDarkMode={props.setDarkMode}
          potInfo={props.PULSEPOT.potInfo}
          APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]}
        />
        <div>
          <Navbar
            setShowMenu={props.setShowMenu}
            showMenu={props.showMenu}
            isDarkMode={props.isDarkMode}
            connectWallet={props.connectWallet}
            userInfo={props.PULSEPOT.userInfo}
            APP_PLSP={props.PULSEPOT[REACT_APP_PLSP]}
            setShowChain={props.setShowChain}
            showChain={props.showChain}
          />
          <Suspense fallback={<div>...loading</div>}>
            <Routes>
              <Route
                index
                element={
                  <Main
                    setShowToken={props.setShowToken}
                    showToken={props.showToken}
                    potAddress={props.potAddress}
                    PULSEPOT={props.PULSEPOT}
                    isDarkMode={props.isDarkMode}
                    connectWallet={props.connectWallet}
                  />
                }
                isDarkMode={props.isDarkMode}
              />

              <Route path='faqs' element={<Faqs />} />

              <Route path='rules' element={<Rules isDarkMode={props.isDarkMode} />} />

              <Route
                path='pricecallsroom'
                element={<PriceCallsRoom PULSEPOT={props.PULSEPOT} tokens={props.PULSEPOT.tokens} />}
              />

              <Route
                path='roulette/:id'
                element={
                  <Roulette
                    setShowToken={props.setShowToken}
                    showToken={props.showToken}
                    potAddress={props.potAddress}
                    PULSEPOT={props.PULSEPOT}
                    isDarkMode={props.isDarkMode}
                    connectWallet={props.connectWallet}
                  />
                }
              />
              <Route path='sports' element={<Sports />} />
              <Route
                path='jackpot'
                element={
                  <Home
                    setShowToken={props.setShowToken}
                    showToken={props.showToken}
                    potAddress={props.potAddress}
                    PULSEPOT={props.PULSEPOT}
                    isDarkMode={props.isDarkMode}
                    connectWallet={props.connectWallet}
                  />
                }
              />

              <Route
                path='Powerballroom'
                element={<PowerballCategory />}
                setShowToken={props.setShowToken}
                showToken={props.showToken}
                potAddress={props.potAddress}
                PULSEPOT={props.PULSEPOT}
                isDarkMode={props.isDarkMode}
                connectWallet={props.connectWallet}
              />
              <Route path='tokenomics' element={<Tokenomics />} />
              <Route
                path='fortunewheel/:id'
                element={
                  <FortuneWheel
                    setShowToken={props.setShowToken}
                    showToken={props.showToken}
                    potAddress={props.potAddress}
                    PULSEPOT={props.PULSEPOT}
                    isDarkMode={props.isDarkMode}
                    connectWallet={props.connectWallet}
                  />
                }
              />

              <Route path='about' element={<About />} />
              <Route
                path='*'
                element={
                  <Main
                    setShowToken={props.setShowToken}
                    showToken={props.showToken}
                    potAddress={props.potAddress}
                    PULSEPOT={props.PULSEPOT}
                    isDarkMode={props.isDarkMode}
                    connectWallet={props.connectWallet}
                  />
                }
              />
            </Routes>
          </Suspense>
        </div>
        <TermsModal open={!acceptedTerms} onClose={clickAccepted} />
        <Box className='mobile-ballon' aria-describedby={popOverId} onClick={handleClick}>
          <img src='/assets/wallet.png' width='30px' height='30px' alt='wallet' />
          <Typography variant='body2' style={{ color: 'white' }}>
            Wallet
          </Typography>
        </Box>
        <CustomPopover
          id={popOverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Enter
            setShowToken={props.setShowToken}
            showToken={props.showToken}
            potAddress={props.potAddress}
            account={props.PULSEPOT.userInfo.account}
            connectWallet={props.connectWallet}
            tokens={props.PULSEPOT.tokens}
          />
        </CustomPopover>
      </div>
    </ThemeProvider>
  );
}
