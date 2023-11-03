import { Link } from 'react-router-dom';
import logo from '../../assets/images/menu-logo-bnb.png';
import bnbp from '../../assets/images/bnbp-icon.png';
import bnbp_grey from '../../assets/images/bnbp-icon-staked.png';
import './menu.css';
import '../../components/MenuSegment/menuSegment.css';
import Games from '../../components/MenuSegment/GAMES/Games';
import Info from '../../components/MenuSegment/INFO/Info';
import Plsp from '../../components/MenuSegment/PLSP/Plsp';
import Stats from '../../components/MenuSegment/STATS/Stats';
import telegram from '../../assets/images/tg-logo.png';
import React from 'react';
import Enter from '../../components/Enter/Enter';
import { useStyles } from './index.styles';
const REACT_APP_NATIVE_TOKEN = process.env.REACT_APP_NATIVE_TOKEN;
function Menu(props) {
  const classes = useStyles();
  console.log(props.showMenu);
  return (
    <div
      className={props.showMenu ? 'Menu card scrollbar' : classes.laptopRoot}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={classes.logoDiv}>
        <Link to={'/'}>
          <img src='/assets/logo.png' alt='plqp' style={{ width: '50px' }} />
        </Link>
      </div>
      <div className={classes.content}>
        <div className='Menu-pphase'>
          {/* <div className='Menu-pphase-user'>
            <img src={bnbp_grey} alt='bnbp logo' />
            <span className='white'>{parseFloat(props.userInfo['BNBP_stake'].toFixed(2))}</span>
            <img src={bnbp} alt='bnbp logo' />
            <span className='white'>{parseFloat(props.userInfo['BNBP_balance'].toFixed(2))}</span>
          </div> */}
          <div></div>
          <div className='Mune-pphase-all p-phase-progressbar mobile_none'>
            <div
              className='bgblue'
              style={{ width: (props.totalPlspClaimed * 100) / 100000 + '%', height: '12px', borderRadius: '6px' }}
            ></div>
            <div className='pphase-percentage'>{((props.totalPlspClaimed * 100) / 100000).toFixed(2) + '%'}</div>
          </div>
        </div>

        <Link
          to='/'
          className='Menu-logo-container'
          onClick={() => {
            let width__ = document.querySelector('.Home_content1').offsetWidth / 2;
            document.querySelector('.Navbar').style.gridTemplateColumns = width__ + 'px ' + width__ + 'px ';
            props.setPage(0);
          }}
        >
          <div className='Menu-logo'>
            {/* <img src={logo} alt='logo' /> */}
            <div className='Menu-logo_text white'>{/* {REACT_APP_NATIVE_TOKEN}POT.io */}</div>
          </div>
        </Link>
        <Games
          setShowMenu={props.setShowMenu}
          isDarkMode={props.isDarkMode}
          page={props.page}
          setPage={props.setPage}
        />
        <Plsp
          BNBP_MARKET_PRICE={props.BNBP_MARKET_PRICE}
          setShowMenu={props.setShowMenu}
          APP_PLSP={(props.APP_PLSP / 10 ** 10).toFixed(2)}
          page={props.page}
          setPage={props.setPage}
        />
        <Stats potInfo={props.potInfo} setShowMenu={props.setShowMenu} page={props.page} setPage={props.setPage} />
        <Info setShowMenu={props.setShowMenu} page={props.page} setPage={props.setPage} />

        {/* <a
          href='#'
          target='_blank'
          rel='noopener noreferrer'
          className='navbar_join_tele desktop_none'
        >
          <img className='card' src={telegram} alt='chain logo' />
          Join telegram
        </a> */}
      </div>
      {/* <div className='ColorMode'>
        <div className="tooltip ">
          <img src={lightMode} alt='sun icon' />
          <span className="tooltiptext">Coming soon</span>
        </div>
        <div className={props.isDarkMode ? "Selected" : ""} onClick={() => {
          props.setDarkMode(true);
        }}>
          <img src={darkMode} alt='moon icon' />
        </div>

      </div> */}
    </div>
  );
}

export default Menu;
