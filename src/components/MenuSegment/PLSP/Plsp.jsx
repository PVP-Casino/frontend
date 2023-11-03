import { Link } from 'react-router-dom';
import './plsp.css';
import React, { useState } from 'react';
import trade from '../../../assets/images/Menu icons/Token section/trade.png';
import stake from '../../../assets/images/Menu icons/Token section/stake.png';
import tokenomics from '../../../assets/images/Menu icons/Token section/tokenomics.png';

const REACT_APP_PLSP_SYMBOL = process.env.REACT_APP_PLSP_SYMBOL;

export default function Plsp(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className='MenuContent Plsp'>
      <div
        className='menuTitle'
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        {/* {REACT_APP_PLSP_SYMBOL} */}
        ZTP
        <div className={isMenuOpen ? 'triangle-down' : 'triangle-forward'}></div>
      </div>
      <div className={isMenuOpen ? 'menuItems' : ' menuItems mobile_none  '}>
        <div
          style={{ position: 'relative' }}
          className={props.page == 6 ? 'menuItem CurrentMenuItem' : 'menuItem'}
          onClick={() => {
            props.setPage(6);
            props.setShowMenu(false);
          }}
        >
          {/* <Link to='/swap'> */}
          <Link to='#'>
            <img src={trade} alt='menu item' />
            SWAP
            <div
              target='_blank'
              className='MenuItem_mobile_pos menu_bnbp_mprice'
              onClick={(e) => {
                e.stopPropagation();
                window.open('https://dexscreener.com/bsc/0x4c736d24d72d874cc2465553500c1ff3fc7b3bda', '_blank');
              }}
            >
              {/* ${props.BNBP_MARKET_PRICE} */}
            </div>
          </Link>
        </div>
        <div
          className={props.page == 7 ? 'menuItem CurrentMenuItem' : 'menuItem'}
          onClick={() => {
            props.setPage(7);
            props.setShowMenu(false);
          }}
        >
          {/* <Link to='/stake'> */}
          <Link to='#'>
            <img src={stake} alt='menu item' />
            STAKE
          </Link>
        </div>
        <div
          className={props.page == 8 ? 'menuItem CurrentMenuItem' : 'menuItem'}
          onClick={() => {
            props.setPage(8);
            props.setShowMenu(false);
          }}
        >
          <Link to='/tokenomics'>
            {/* <Link to='#'> */}
            <img src={tokenomics} alt='menu item' />
            TOKENOMICS
          </Link>
        </div>
      </div>
    </div>
  );
}
