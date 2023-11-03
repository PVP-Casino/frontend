import React from 'react';

export default function TokenImage(props) {
  const tokenNames = {
    Avalanche: 'avax',
    'Cardano Token': 'ada',
    Chainlink: 'link',
    Dogecoin: 'doge',
    Ethereum: 'eth',
    Fantom: 'ftm',
    'Matic token': 'matic',
    'SHIBA INU': 'shib',
    'Wrapped BNB': 'bnb',
  };
  return (
    <img
      src={`/assets/tokens/${tokenNames[props.token] || props.token.toLowerCase()}.png`}
      alt={props.token}
      className={props.className}
    />
  );
}
