import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: `grid`,
    gridTemplateColumns: `1fr 350px 1fr`,
    justifyItems: `center`,
    height: `400px`,
    // backgroundColor: `#2d2e36`,
    margin: `auto`,
    width: `100%`,
    position: `relative`,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: `1fr`,
    },
  },
  burnBouns: {
    display: `grid`,
    alignItems: `end`,
    marginBottom: `50px`,
    fontSize: `8px`,
    minWidth: `max-content`,
    position: `relative`,
    right: '-50px',
    '&>div': {
      textAlign: 'center',
    },
    '& img': {
      width: '16px',
      height: '16px',
      marginRight: '5px',
    },
    '& .card': {
      display: 'flex',
      alignItems: 'center',
      padding: '5px 10px',
      borderRadius: '58px',
      fontSize: '14px',
    },
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: '380px',
      left: '-10px',
      right: 'inherit',
    },
  },
  wheel: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  wheelInner: {
    display: `grid`,
    justifyItems: `center`,
    width: `200px`,
    height: `200px`,
    margin: `auto`,
    borderRadius: `100%`,
    gridTemplateRows: `50px 30px 30px`,
    alignContent: `center`,
    alignItems: `center`,
    fontWeight: `bold`,
    position: `absolute`,
    marginLeft: `auto`,
    marginRight: `auto`,
    left: `0`,
    right: `0`,
    textAlign: `center`,
    boxShadow: `inset 2px 2px 5px #384771, inset -2px -2px 5px black`,
    background: `radial-gradient(#37416d, #111623)`,
    [theme.breakpoints.down('xs')]: {
      width: '170px',
      height: '170px',
    },
  },
  timer: {
    fontSize: `38px`,
    color: `#f3ba2c !important`,
    background: `rgba(255, 255, 255, 0) !important`,
  },
  countdown: {
    '& .displayedTime span': {
      fontSize: `38px !important`,
      fontWeight: `600 !important`,
      color: `#f3ba2c !important`,
      background: `rgba(255, 255, 255, 0) !important`,
    },
  },
  participants: {
    fontSize: `16px`,
    color: `#7d838a`,
  },
  usdValue: {
    fontSize: `25px`,
    fontWeight: `normal`,
    color: 'white',
  },
  arrow: {
    position: `absolute`,
    zIndex: 2,
    '& img': {
      width: '20px',
      height: '30px',
    },
  },
  spinWheel: {},
  wheelInner2: {
    background: `#1e233c`,
    borderRadius: `100%`,
    height: `330px`,
    width: `330px`,
    display: `flex`,
    alignItems: `center`,
    boxShadow: '2px 2px 2px #06070c, inset 2px 2px 2px #384365',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
      height: '300px',
    },
  },
  wheelInner2Dark: {
    width: `260px`,
    height: `260px`,
    margin: `auto`,
    background: `#232c46`,
    borderRadius: `100%`,
    display: `flex`,
    boxShadow: 'inset 2px 2px 4px #121725, inset -2px -2px 4px #414d77',
    alignItems: `center`,
    [theme.breakpoints.down('xs')]: {
      width: '230px',
      height: '230px',
    },
  },
  wheelInner3: {
    display: `grid`,
    justifyItems: `center`,
    width: `200px`,
    height: `200px`,
    margin: `auto`,
    borderRadius: `100%`,
    gridTemplateRows: `50px 30px 30px`,
    alignContent: `center`,
    alignItems: `center`,
    fontWeight: `bold`,
    position: `absolute`,
    marginLeft: `auto`,
    marginRight: `auto`,
    left: 0,
    right: 0,
    textAlign: `center`,
  },
  burnBonusCard: {
    borderRadius: '15px',
    background: '#232a4a',
    boxShadow: '2px 2px 2px #161a2f, inset 2px 2px #495a8d',
    padding: '5px 10px',
    color: 'gray',
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
  },
}));
