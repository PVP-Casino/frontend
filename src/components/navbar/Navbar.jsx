import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import Blocky from '../blocky/Blocky';
import chain from '../../assets/images/bsc.png';
import telegram from '../../assets/images/tg-logo.png';
import logo from '../../assets/images/bnbp-icon.png';
import bnbp_grey from '../../assets/images/bnbp-icon-staked.png';

import arrowDown from '../../assets/images/arrow-down-sign-to-navigate.png';
import menu from '../../assets/images/menu-icon.png';
import pulsechaingrey from '../../assets/images/pulsechain-grey.png';
import avaxgrey from '../../assets/images/avax-grey.png';
import polygongrey from '../../assets/images/polygon-grey.png';
import fantomgrey from '../../assets/images/fantom-grey.png';

const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL;

export default function Navbar(props) {
  const location = useLocation();
  return (
    <div className='Navbar'>
      <div className='mobile-header desktop_none'>
        <Link to='/'>
          <img src={'/assets/logo.png'} alt='mobile menu' />
        </Link>
        <div
          className={props.isDarkMode ? 'nbContent2-connect-dark hover card ' : 'nbContent2-connect hover'}
          onClick={() => {
            !props.userInfo.account && props.connectWallet();
          }}
        >
          {props.userInfo.account ? (
            <div>
              <Blocky address={props.userInfo.account.toLowerCase().toString()} size={''} />
              {props.userInfo.account.toString().substring(0, 5) + '...' + props.userInfo.account.toString().slice(-5)}
            </div>
          ) : (
            <div>Connect</div>
          )}
        </div>
      </div>

      <div
        className='mobile-menu-toggle desktop_none'
        onClick={(e) => {
          props.setShowMenu(!props.showMenu);
          e.stopPropagation();
        }}
      >
        <img src={menu} alt='mobile menu' />
      </div>
      <div className='nbContent1'>
        {/* {!location.pathname.includes('powerball') && (
          <div className='card currency-rate'>
            1 {REACT_APP_PLSP_SYMBOL} = ${parseFloat(props.APP_PLSP) / (10 ** 10).toFixed(2)}
          </div>
        )} */}
        {/* <div
          className='card hover multichain'
          onClick={(e) => {
            e.stopPropagation();
            props.setShowChain(!props.showChain);
          }}
        >
          <img src={chain} alt='chain logo' />
          <img src={arrowDown} alt='navigation logo' className='multichain-dropdown-img' />
          <div className={props.showChain ? 'multichain-dropdown' : 'none'}>
            <div>
              <img src={pulsechaingrey} alt='chain logo' />
              Pulsechain
            </div>
            <div>
              <img src={avaxgrey} alt='chain logo' />
              Avalanche
            </div>
            <div>
              <img src={polygongrey} alt='chain logo' />
              Polygon
            </div>
            <div>
              <img src={fantomgrey} alt='chain logo' />
              Fantom
            </div>
          </div>
        </div> */}
        <a href='#' target='_blank' className='navbar_join_tele white' rel='noopener noreferrer'>
          <img className='card' src={telegram} alt='chain logo' />
          <p>Join telegram</p>
        </a>
      </div>
      <div style={{ flexGrow: 1 }}></div>
      <div className='nbContent2'>
        {/* <div className='display-flex poweredby'>
          <span style={{ color: '#787878' }} className='powered-by-string'>
            Powered by &nbsp;&nbsp;
          </span>
          <Link className='poweredby-link'>
            <img src='/assets/tokens/link.png' alt='token' />
            <span>Chainlink</span>
          </Link>
        </div> */}
        {/* <Link to='/pphase'>
          <div className='nbContent2-pphase card hover'>
            <div className="tooltip_ ">
              <span className="tooltiptext">Participation phase tokens</span>
              <img src={bnbp_blue} alt="alarm clock" />
              <div>
                {parseFloat(props.userInfo['p_phase' + REACT_APP_PLSP].toFixed(2))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
            <div className='tooltip_ '>
              <span className='tooltiptext'>Staked BNBP</span>
              <img src={bnbp_grey} alt='alarm clock' />
              <div>
                {parseFloat(props.userInfo['BNBP_stake'].toFixed(2))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
            <div className='tooltip_ '>
              <span className='tooltiptext'>BNBP tokens</span>
              <img src={logo} alt='alarm clock' />
              <div>
                {parseFloat(props.userInfo['BNBP_balance'].toFixed(2))
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </div>
            </div>
          </div>
        </Link> */}
        <div
          className={props.isDarkMode ? 'nbContent2-connect-dark hover card ' : 'nbContent2-connect hover'}
          onClick={() => {
            !props.userInfo.account && props.connectWallet();
          }}
        >
          {props.userInfo.account ? (
            <div>
              <Blocky address={props.userInfo.account.toLowerCase().toString()} size={''} />
              {props.userInfo.account.toString().substring(0, 5) + '...' + props.userInfo.account.toString().slice(-5)}
            </div>
          ) : (
            <div>Connect</div>
          )}
        </div>
        {/* <img src={props.isDarkMode ? bell_dark : bell} alt="alarm icon" className='hover' />
                    <img src={props.isDarkMode ? messenger_dark : messenger} alt="message icon" className='hover' /> */}
      </div>
    </div>
  );
}
