import { Link } from 'react-router-dom';
import React from 'react';
import './tokenomics.css';
// import logo from '../../assets/images/logo.png'
import countdown from '../../assets/images/time.png';
import CountdownTimer from 'react-component-countdown-timer';
export default function Tokennomics(props) {
  return (
    <div className='card Tokennomics Page' style={{ textAlign: 'justify' }}>
      <div className='page_title  underline-yellow'>Tokenomics</div>
      <div className='Page-subtle-content'>
        <div className='tps-content'>
          <div className='tps-content1'>
            <div className='Page-subtle'>Profit sharing:</div>
            <div className='width-80'>
              All decentralized games on ZETAPlay.io takes a small percentage fee from the winner. These fees are used
              to buy ZTP from the market and distribute to our ZTP token holders. Fees are distributed as following:
              <div className='tps-content1-distribution'>
                <span className='orange'>75%</span> to monthly airdrop
              </div>
              <div className='tps-content1-distribution'>
                <span className='orange'>20%</span> to daily buy and burn
              </div>
              <div className='tps-content1-distribution'>
                <span className='orange'>5%</span> to community lottery
              </div>
              <p>
                Only staked ZTP will be eligible for airdrop and lottery rewards. Stake your ZTP{' '}
                {/* <Link to='/stake' className='orange'> */}
                <Link to='/#' className='orange'>
                  here
                </Link>
              </p>
            </div>
          </div>
          <div className='tps-content2'>
            {/* <Link to='/swap' style={{ textDecoration: 'none' }}>
              <div className='width150 bgorange tps-content2-buy-ZTP hover'>
                BUY ZTP
                <img src={logo} alt='logo icon' />
              </div>
            </Link> */}
            <div className='tps-content2-countdown width150 none'>
              <div>
                Countdown
                <img src={countdown} alt='countdown icon' />
              </div>
              <div className='tps-countdowns'>
                {/* {1661990400} */}
                <div className='tps-countdown'>
                  {' '}
                  <span className='white'>Airdrop</span>
                  <CountdownTimer
                    count={(86400 * 30 - (parseInt(Date.now() / 1000 - 1664150400) % (86400 * 30))) * 0}
                    color='grey'
                  />
                </div>
                <div className='tps-countdown'>
                  {' '}
                  <span className='white'>Lottery</span>
                  <CountdownTimer
                    count={(86400 * 7 - (parseInt(Date.now() / 1000 - 1664150400) % (86400 * 7))) * 0}
                    color='grey'
                  />
                </div>
                <div className='tps-countdown'>
                  {' '}
                  <span className='white'>Burn</span>
                  <CountdownTimer count={(86400 - (parseInt(Date.now() / 1000) % 86400)) * 0} color='grey' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='Page-subtle-content'>
        <div className='Page-subtle'>Pricing:</div>
        <div>
          ZTP will always have a min. value of $30 inside the contracts of ZETAPlay. if the market price of ZTP rises
          above $30 the price will follow up. If ZTP is above $30 on the market, the contracts will add 10% premium to
          the price. If the market price of ZTP falls below $30, you can effectively buy it on the market, and play with
          increased value.
        </div>
      </div>
      <div className='Page-subtle-content'>
        <div className='Page-subtle'>Fees:</div>
        <div>
          Holding ZTP in your wallet reduces the fees you pay as a winner of a game. Fees can vary from 3% to 1.5%
          depending on how many ZTP you have in your wallet at the time of winning.
        </div>
      </div>
      <div className='Page-subtle-content'>
        <div className='Page-subtle'>Token distribution:</div>
        <div>
          1,000,000 Total token supply, 80% distributed to early sacrificers. 10% reserved for participations phase. 10%
          reserved for team wallet
        </div>
      </div>
    </div>
  );
}
