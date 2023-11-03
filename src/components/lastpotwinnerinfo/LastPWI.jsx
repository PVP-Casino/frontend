import './lastPWI.css';
import React from 'react';
import trophy from '../../assets/images/trophy.png';
import plsp_ from '../../assets/images/bnbp-icon.png';
import fee from '../../assets/images/fee.png';
import burn from '../../assets/images/burn.png';
import config from '../../config/game.config';
import { useStyles } from './index.styles';

// const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN
const REACT_APP_PLSP_SYMBOL = config.tokenName;
export default function LastPWI(props) {
  const classes = useStyles();
  let ratio = 1; //0.006
  // console.log(props.winner.amount, props.winner.value, 'sssssss');
  return props.winner ? (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.crown}>
          <span>
            <img src={burn} style={{ width: '10px' }} alt='burn icon' />
            {((((props.winner.value - props.winner.amountwon) * 0.2) / 10 ** 18) * ratio).toFixed(4)}
            <img src={'/assets/tokens/AZETA.png'} style={{ width: '15px' }} alt='plsp icon' />
            {REACT_APP_PLSP_SYMBOL}
          </span>
          <img src={trophy} alt='trophy icon' />
        </div>
        <div className={classes.congrat}>
          Congratulations{' '}
          <span>
            {props.winner.winner.toString().substring(0, 5) + '...' + props.winner.winner.toString().slice(-5)}
          </span>
        </div>
        <div className={classes.won}>
          Won {(props.winner.amountwon / 10 ** 18).toFixed(1)}
          {REACT_APP_PLSP_SYMBOL} with {((props.winner.amount / props.winner.value) * 100).toFixed(1)}% chance
        </div>
        <div className={classes.txlink}>
          <a
            href={'https://zetachain-athens-3.blockscout.com/tx/' + props.winner.txHash}
            target={'_blank'}
            rel='noreferrer'
          >
            {' '}
            Transaction link
          </a>
        </div>
        <div className={`${classes.fee} tooltip__ hover`} style={{ fontSize: '12px' }}>
          <div>
            <span className='tooltiptext'>
              {((props.winner.value - props.winner.amountwon) / 10 ** 18).toFixed(3)}
              {REACT_APP_PLSP_SYMBOL} accumulated as fees
            </span>
            {(((props.winner.value - props.winner.amountwon) * 100) / props.winner.value).toFixed(2)}%
            <img src={fee} style={{ width: '11px' }} alt='plsp icon' />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.info}>
        <div className={classes.crown}>
          <img src={trophy} alt='trophy icon' />
        </div>
        <div className={classes.congrat}>
          Unable to get lalest winner <span>0x000...00000</span>
        </div>
        <div className={classes.won}>Unable to get latest winner</div>
        <div className={classes.txlink}>
          <a href='/#'> Transaction link</a>
        </div>
      </div>
    </div>
  );
}
