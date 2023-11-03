import React from 'react';
import pricecalls from '../../assets/images/pricecall-bg.png';

export default function Maintaince(props) {
  return (
    <div
      className='card PriceCalls Page ComingSoonPage'
      style={{
        backgroundImage: `url(${pricecalls})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='page_title'>Price Calls </div>

      <div className='Page-coming-soon orange '>Coming soon...</div>
    </div>
  );
}
