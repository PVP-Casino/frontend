import './wheel.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import arrowhead from '../../assets/images/arrowhead-yellow.png';
import plsp_ from '../../assets/images/bnbp-icon.png';
import burn from '../../assets/images/burn.png';
import config from '../../config/game.config';
import { useStyles } from './index.styles';

const stc = require('string-to-color');

const REACT_APP_PLSP_SYMBOL = config.symbol;
const beepAudio = new Audio('beep.mp3');
beepAudio.load();
const potTime = 180;

const Wheel = (props) => {
  const classes = useStyles();
  const { roundDuration, roundLiveTime, roundStatus, totalAmount } = useSelector((state) => state.jackpot);
  const { PotInfo, isSpinning, setStartTimer } = props;
  // const [time, setTime] = useState(potTime);
  const [width, setWidth] = useState(window.innerWidth);
  const xsPoint = useMediaQuery((theme) => theme.breakpoints.down(`xs`));
  const [currentTimeStr, setCurrentTimeStr] = useState('2:00');
  const roundDurationRef = useRef(120);
  const [time, setTime] = useState(Math.floor(Date.now() / 1000));
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const radius = width > 400 ? 175 : 140;
  const [BNBPPrice, SetBNBPPrice] = useState(1);
  const roundLiveTimeRef = useRef(0);
  const audioPlayingRef = useRef(false);
  const circleRadius = radius - 25;
  let endIn = 0,
    start = 0;
  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

    return d;
  }
  function updatePotLiveTime() {
    if (PotInfo.participants.addresses.length > 1 && !isSpinning) {
      window.PotContract.methods
        .roundLiveTime()
        .call()
        .then((roundLiveTime) => {
          // console.log({ roundLiveTime });
          roundLiveTimeRef.current = Number(roundLiveTime);
        });
    }
  }
  const playSound = async (timeLeft) => {
    if (timeLeft >= 0 && timeLeft <= 16) {
      if (!audioPlayingRef.current && window.localStorage.getItem('muted') != 'true') {
        try {
          beepAudio.click();
          await beepAudio.play();
          audioPlayingRef.current = true;
        } catch (error) {
          console.error(error);
          audioPlayingRef.current = false;
        }
      }
    } else {
      audioPlayingRef.current = false;
      beepAudio.pause();
    }
  };
  // update
  // console.log({ roundDuration });
  let timeStr = '2:00';
  const displayCounter = () => {
    const timeLeft = roundDuration + roundLiveTime - time;
    // console.log({ roundStatus, timeLeft });
    if (timeLeft <= 0) return '0:00';
    else if (timeLeft > 0) {
      playSound(timeLeft);
      const min = Math.floor(timeLeft / 60);
      const sec = timeLeft % 60;
      if (sec < 10) return `${min}:0${sec}`;
      else return `${min}:${sec}`;
    }

    // return { min, sec }
  };
  const convertRoundDuration = () => {
    const min = Math.floor(roundDurationRef.current / 60);
    let second = roundDurationRef.current % 60;
    if (second < 10) second = '0' + second;
    return `${min}:${second}`;
  };

  if (roundStatus == 0 || roundStatus == 1) {
    timeStr = convertRoundDuration();
  } else if (roundStatus == 2) {
    timeStr = displayCounter();
  }

  useEffect(() => {
    updatePotLiveTime();
  }, [PotInfo.participants.addresses]);

  useEffect(() => {
    const getPrice = async () => {
      try {
        let data;
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/0x4D9927a8Dc4432B93445dA94E4084D292438931F',
          {}
        );
        data = await response.json();
        SetBNBPPrice(Number(data.pairs[0].priceUsd));
      } catch (error) {
        console.log('Failed to fetch: ', error);
      }
    };
    getPrice();
  }, []);

  useEffect(() => {
    roundDurationRef.current = roundDuration;
  }, [roundDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      // displayCounter();
      setTime(Math.floor(Date.now() / 1000));
      // console.log(roundStatus);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.burnBouns}>
        <div className={PotInfo.participants.addresses.length == 0 ? '' : ''}>
          {/* Pot will burn: */}
          <div className={classes.burnBonusCard}>
            <img src={burn} alt='fire logo' />
            {parseFloat(((0.03 * 0.05 * Number(PotInfo.currentRoundTotalUsd)) / (BNBPPrice * 10 ** 10)).toFixed(2))}
            <img src={'/assets/tokens/AZETA.png'} alt='fire logo' style={{ marginLeft: '5px' }} />
            AZETA
          </div>
        </div>
      </div>
      <div className={classes.wheel}>
        <div className={classes.wheelInner}>
          <div className={classes.timer}>
            {/* {parseInt(PotInfo.participants.addresses.length) > 1 ? (
              <div className={classes.countdown}>
                {time == 0 && !isSpinning && <div className='waitingFB'>WAITING FOR BLOCK</div>}
                {Math.floor(time / 60)}:{(time % 60 < 10 ? '0' : '') + (time % 60)}
              </div>
            ) : (
              convertRoundDuration()
            )} */}
            {
              <div className={classes.countdown}>
                {((roundStatus == 2 && roundDuration + roundLiveTime < Date.now() / 1000) || roundStatus == 3) && (
                  <div className='waitingFB'>WAITING FOR BLOCK</div>
                )}
                {timeStr}
              </div>
            }
          </div>
          <div className={classes.participants}>
            {PotInfo.participants.addresses.length} Participant
            {PotInfo.participants.addresses.length > 1 ? 's' : ''}
          </div>
          <div className={classes.usdValue}>${PotInfo.currentRoundTotalUsd.toFixed(2)}</div>
          <div
            className={classes.arrow}
            style={{ top: xsPoint ? `${-45 + 150 - radius}px` : `${-45 + 175 - radius}px` }}
          >
            <img src={arrowhead} alt='arrowhead icon' />
          </div>
        </div>
        {PotInfo.participants.addresses.length > 0 ? (
          <svg
            className={classes.spinWheel}
            id='wheel'
            width={radius * 2}
            height={radius * 2}
            style={{ animatiossnTimingFunction: 'ease-in !important', marginTop: '0px' }}
          >
            {PotInfo.participants.addresses.map((address, index, array) => {
              start = endIn;
              endIn = start + (PotInfo.participants.usdValue[index] * 359.8) / PotInfo.currentRoundTotalUsd;
              if (address == undefined) {
                return '';
              } else {
              }
              return (
                <path
                  data-start={start}
                  data-stop={endIn}
                  key={index}
                  id='arc1'
                  d={describeArc(radius, radius, circleRadius, start, endIn)}
                  fill='none'
                  stroke={stc(address.toString().toLowerCase() + '')}
                  strokeWidth='40'
                />
              );
            })}
          </svg>
        ) : (
          <div className={classes.wheelInner2}>
            <div className={props.isDarkMode ? classes.wheelInner2Dark : classes.wheelInner3}></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Wheel;
