import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import LatestWinners from '../../components/LatestWinners';
import mainImage from '../../assets/images/fp-background.png';
import bnbandchainlinkImg from '../../assets/images/bnbandchainlink.png';
import checkImg from '../../assets/images/gfx-frontpage/check.png';
import BnbpImage from '../../assets/images/gfx-frontpage/bnbp.png';
import { formatRouletteHistoryItem, formatFortuneHistoryItem, Toast } from '../../reducers/utils';
import { LATEST_WINNER_EVENTS } from '../../enums';
import gameConfig from '../../config/game.config';
import './main.css';

const serverUrl = gameConfig.serverUrl;

export default function Main(props) {
  const advantages = [
    'No account & no deposit',
    'Fully on-chain game code',
    'Guaranteed instant payouts',
    'Direct player vs. player',
    'No censorship',
  ];
  const tokenList = ['bnb', 'busd', 'cake', 'matic', 'usdc', 'eth', 'bnbp'];
  const [latestWinners, setLatestWinners] = useState({ jackpot: {}, roulette: {}, powerball: {}, fortune: {} });
  const latestWinnersRef = useRef({ jackpot: {}, roulette: {}, powerball: {}, fortune: {} });
  const navigate = useNavigate();
  // console.log({ latestWinners });
  useEffect(() => {
    setnavbarwidth();
    function handleResize() {
      setnavbarwidth();
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      document.querySelector('.Navbar').style.gridTemplateColumns = null;
    };
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(`${serverUrl}/events/latest-winner`);
    eventSource.onmessage = (e) => {
      if (e.data.includes('welcome')) {
        getLatestWinners();
      }
      if (e.data.includes('eventName')) {
        const res = JSON.parse(e.data);
        console.log('🚀 ~ file: Main.js ~ useEffect ~ event occurred', res);

        switch (res.eventName) {
          case LATEST_WINNER_EVENTS.JackpotWinner:
            updateLatestJackpotWinner(res.data);
            break;

          default:
            break;
        }
      }
    };
    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    latestWinnersRef.current = latestWinners;
  }, [latestWinners]);

  const startAnimation = (className) => {
    const winnerElements = document.getElementsByClassName(className);
    if (winnerElements.length) {
      winnerElements[0] && winnerElements[0].classList.add('fadeOutIn');
      winnerElements[1] && winnerElements[1].classList.add('fadeOutIn');
      setTimeout(() => {
        winnerElements[0] && winnerElements[0].classList.remove('fadeOutIn');
        winnerElements[1] && winnerElements[1].classList.remove('fadeOutIn');
      }, 4000);
    }
  };

  const updateLatestJackpotWinner = (winner) => {
    if (winner.returnValues.potRound > latestWinnersRef.current.jackpot.round) {
      const newWinner = {
        amount: winner.returnValues.amount,
        amountwon: winner.returnValues.amountWon,
        block: winner.blockNumber,
        participant: winner.returnValues.participants,
        round: Number(winner.returnValues.potRound),
        txHash: winner.transactionHash,
        value: winner.returnValues.potValue,
        winner: winner.returnValues.winner.toLowerCase(),
      };
      setLatestWinners((prevState) => ({ ...prevState, jackpot: newWinner }));
      startAnimation('jackpot-latest-winner');
    }
  };

  function setnavbarwidth() {
    const element = document.querySelector('.main-div');
    let width__ = element.offsetWidth;
    document.querySelector('.Navbar').style.gridTemplateColumns = (width__ * 3) / 5 + 'px ' + (width__ * 1) / 3 + 'px';
  }

  const getLatestWinners = async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/info/latestWinners`);
      // console.log({ data });
      setLatestWinners(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Grid
        container
        className='Home_content1 main-div'
        style={{
          backgroundImage: `url(${mainImage})`,
          backgroundSize: 'cover',
          padding: '70px 0px',
        }}
      >
        <Grid item lg={7} md={8} xs={12} sm={12}>
          <Box className='main-page-left'>
            <Box className='main-page-title'>
              World's first 100%
              <br />
              Decentralized PVP casino
            </Box>
            <Box className='powered-by-div' display='flex'>
              <Typography variant='body2' className='powered-by-label'>
                powered by
              </Typography>
              <Link href='#'>
                <img src={bnbandchainlinkImg} className='chain-link-img' alt='chain-link' />
              </Link>
            </Box>
            <Box>
              <Typography
                variant='body1'
                style={{
                  color: 'grey',
                  fontSize: '15px',
                }}
              >
                Introducing the world's first player vs. player smart contract based casino platform. All games and
                tokenomics are decentralized and transparent on-chain. Game randomness secured by Chainlink VRF
              </Typography>
            </Box>
            <Box className='advantage-div'>
              {advantages.map((item, index) => (
                <Box display='flex' alignItems='center' key={index} style={{ margin: '6px 0px' }}>
                  <img src={checkImg} width='40px' alt='check' />
                  <Typography
                    variant='h6'
                    style={{
                      color: 'lightgrey',
                      marginLeft: '20px',
                      fontWeight: 700,
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              ))}
            </Box>
            {/* <Box className='main-token-list-div' style={{ marginTop: '70px' }}>
              <Typography
                variant='body2'
                style={{
                  color: 'grey',
                }}
              >
                Play with your favourite token
              </Typography>
              <Box style={{ float: 'right' }} className='extra-badge'>
                <span className='green-badge'>+10 others</span>
              </Box>
              <Box className='token-list-div'>
                {tokenList.map((item, index) => (
                  <Box key={index}>
                    <img src={`assets/gfx-frontpage/${item}.png`} alt='main-token' className='main-token-img' />
                    <Typography className='main-token-name' variant='body2'>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box> */}
          </Box>
        </Grid>
        <Grid item lg={4} md={4} xs={12} sm={12}>
          <Box className='main-page-right'>
            <Box className='stake-div' onClick={() => navigate('/stake')}>
              <Typography
                variant='h6'
                style={{
                  color: 'rgb(60 145 194)',
                  textTransform: 'uppercase',
                  fontSize: '17px',
                  textAlign: 'center',
                  fontWeight: '800',
                }}
              >
                stake now!
              </Typography>
              <Box display='flex' justifyContent='center' alignItems='center' style={{ margin: '10px' }}>
                <img src={'/assets/tokens/ztp.png'} width='40px' alt='bnbp' />
                <Typography
                  variant='h6'
                  style={{
                    textTransform: 'uppercase',
                    color: 'lightgrey',
                    fontSize: '23px',
                    fontWeight: 900,
                    marginLeft: '11px',
                  }}
                >
                  ztp staking
                </Typography>
              </Box>
              <Typography
                variant='h5'
                style={{
                  color: 'rgb(244 196 80)',
                  textAlign: 'center',
                  fontSize: '25px',
                  fontWeight: '700',
                }}
              >
                ~5.5% APR
              </Typography>
            </Box>
            <LatestWinners winners={latestWinners} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
