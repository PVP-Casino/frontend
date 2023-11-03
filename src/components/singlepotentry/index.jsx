import React from 'react';
import Web3 from 'web3';
import Blocky from '../blocky/Blocky';
import TokenImage from '../TokenImage';

import { useStyles } from './index.styles';
const SinglePE = (props) => {
  const classes = useStyles();
  if (!props.entry) {
    return <div>Loading</div>;
  }
  return (
    <div className={classes.root}>
      <span>
        <Blocky address={props.entry.address.toLowerCase().toString()} size={''} />
        <Blocky
          address={props.entry.address.toLowerCase().toString()}
          scale_={16}
          size_={1}
          bgColor_={props.entry.address.toLowerCase().toString()}
          spotColor_={props.entry.address.toLowerCase().toString()}
          className_={'round-identicon'}
        />
      </span>
      <span>{props.entry.address.toString().substring(0, 5) + '...' + props.entry.address.toString().slice(-5)}</span>
      <span className={classes.price}>
        ${parseFloat(parseFloat(Web3.utils.fromWei('' + props.entry.usdvalue, 'ether')).toFixed(2))}
      </span>
      <span className={classes.amount}>
        {parseFloat(parseFloat(Web3.utils.fromWei('' + props.entry.value, 'ether')).toFixed(5))}
      </span>
      <TokenImage token={props.entry.token.toString()} className={classes.tokenimage} />
    </div>
  );
};
export default SinglePE;
