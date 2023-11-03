import React from 'react';
import roulette from '../../assets/images/roulette-bg.png';
import './Maintenance.css';

export default function Home(props) {
  return (
    <div
      className='Jackpot Page ComingSoonPage'
      style={{
        backgroundImage: `url(${roulette})`,
        backgroundSize: '100% 100%',
      }}
    >
      <div className='page_title'>Roulette</div>

      <div className='Page-coming-soon orange maintenance-title'>Coming soon</div>
    </div>
  );
}
