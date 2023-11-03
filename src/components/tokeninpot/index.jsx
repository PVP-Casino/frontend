import './tokenIP.css';
import React from 'react';
import TokenImage from '../TokenImage';
import TokenSymbol from '../TokenSymbol';

import { useStyles } from './index.styles';
var BigInt = require('big-integer');

export default function TokenIP(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* tokenName={tokens.tokenName} amount={tokens.amount} usdValue={tokens.usdValue}  */}
      <TokenImage token={props.name} className={''} />
      <span className={classes.name}>
        <TokenSymbol name={props.name} />
      </span>
      <span className={classes.amount}>
        {parseFloat(parseFloat(window.__web3.utils.fromWei(BigInt(props.value).toString(), 'ether')).toFixed(5))}
      </span>
      <span className={classes.usd}>${parseFloat((props.usdvalue / 10 ** 10).toFixed(2))}</span>
      {/* <span>{props.price}</span> */}
    </div>
  );
}
