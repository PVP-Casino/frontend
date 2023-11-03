import './userCPI.css';
import React from 'react';
import Account from '../account/Account';
import Blocky from '../blocky/Blocky';
import { useStyles } from './index.styles';
import { CardDiv } from '../../layouts';
export default function UserCPI(props) {
  const classes = useStyles();
  return props.account.length > 0 ? (
    <CardDiv className={classes.root}>
      <Account accounts={props.account} />
      <div className={classes.entry}>
        You've sent $
        {isNaN((parseFloat(props.userTotalusd) / 10 ** 10).toFixed(2))
          ? 0
          : (parseFloat(props.userTotalusd) / 10 ** 10).toFixed(2)}{' '}
        to round #{props.potRound.toString()} of ZETA PLAY
      </div>
      <div className={classes.chance}>
        <Blocky
          address={props.account}
          scale_={16}
          size_={1}
          bgColor_={props.account}
          spotColor_={props.account}
          className_={'round-identicon'}
        />
        You have{' '}
        <span style={{ color: '#fff' }}>
          {(((parseFloat(props.userTotalusd) || 0) / (parseFloat(props.potTotalUsdValue) || 1)) * 100).toFixed(2) || 0}%
        </span>{' '}
        chance to win.
      </div>
    </CardDiv>
  ) : (
    <CardDiv className={classes.root}>
      <Account account={props.account} />
      <div className={classes.entry}>Please connect your wallet to see your pot information</div>
      <div className={classes.chance}>
        You have <span>0%</span> chance to win.
      </div>
    </CardDiv>
  );
}
